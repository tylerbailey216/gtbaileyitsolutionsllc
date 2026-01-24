const PHISH_API = 'https://phish.sinking.yachts/v2/check/';
const URLHAUS_FEED = 'https://urlhaus.abuse.ch/downloads/csv_online/';
const URLHAUS_TTL_MS = 15 * 60 * 1000;
const FETCH_TIMEOUT_MS = 8000;
const MAX_TEXT_URLS = 6;

const normalizeUrl = (input) => {
  if (!input) return null;
  const trimmed = String(input).trim();
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(candidate);
    url.hash = '';
    let normalized = url.toString();
    if (normalized.endsWith('/')) normalized = normalized.slice(0, -1);
    return normalized.toLowerCase();
  } catch (err) {
    return null;
  }
};

const extractUrlsFromText = (text) => {
  if (!text) return [];
  const regex = /(https?:\/\/[^\s"'<>]+|www\.[^\s"'<>]+)/gi;
  const found = new Set();
  for (const match of text.matchAll(regex)) {
    const raw = match[0];
    const normalized = normalizeUrl(raw);
    if (normalized) found.add(normalized);
  }
  return Array.from(found);
};

const fetchWithTimeout = async (url, options = {}, timeoutMs = FETCH_TIMEOUT_MS) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, { ...options, signal: controller.signal });
    return resp;
  } finally {
    clearTimeout(id);
  }
};

class UrlhausCache {
  constructor() {
    this.lastFetched = 0;
    this.loading = null;
    this.urlMap = new Map();
    this.hostMap = new Map();
  }

  isFresh() {
    return Date.now() - this.lastFetched < URLHAUS_TTL_MS;
  }

  async load() {
    if (this.isFresh()) {
      return { urlMap: this.urlMap, hostMap: this.hostMap, refreshedAt: this.lastFetched };
    }
    if (this.loading) {
      return this.loading;
    }

    this.loading = this.fetchFeed();
    return this.loading;
  }

  async fetchFeed() {
    try {
      const resp = await fetchWithTimeout(URLHAUS_FEED, { method: 'GET' });
      if (!resp.ok) throw new Error(`URLHaus responded with ${resp.status}`);
      const text = await resp.text();
      const nextUrlMap = new Map();
      const nextHostMap = new Map();

      for (const line of text.split('\n')) {
        if (!line || line.startsWith('#')) continue;
        const cleaned = line.trim().replace(/^"|"$/g, '');
        const parts = cleaned.split('","');
        if (parts.length < 3) continue;
        const [, , urlField, , lastOnline, threat] = parts;
        const normalizedUrl = normalizeUrl(urlField);
        if (!normalizedUrl) continue;

        nextUrlMap.set(normalizedUrl, {
          url: normalizedUrl,
          threat: threat || 'listed',
          lastOnline: lastOnline || null,
        });

        try {
          const host = new URL(normalizedUrl).hostname.replace(/^www\./, '').toLowerCase();
          const existing = nextHostMap.get(host) || [];
          if (existing.length < 5) {
            existing.push({
              url: normalizedUrl,
              threat: threat || 'listed',
              lastOnline: lastOnline || null,
            });
          }
          nextHostMap.set(host, existing);
        } catch {
          // ignore host parsing issues
        }
      }

      this.urlMap = nextUrlMap;
      this.hostMap = nextHostMap;
      this.lastFetched = Date.now();
      this.loading = null;

      return { urlMap: this.urlMap, hostMap: this.hostMap, refreshedAt: this.lastFetched };
    } catch (err) {
      this.loading = null;
      throw err;
    }
  }

  async check(inputUrl) {
    const normalized = normalizeUrl(inputUrl);
    if (!normalized) throw new Error('Invalid URL');

    const parsed = new URL(normalized);
    const hostKey = parsed.hostname.replace(/^www\./, '').toLowerCase();
    const { urlMap, hostMap, refreshedAt } = await this.load();

    const matches = [];
    const direct = urlMap.get(normalized);
    if (direct) matches.push({ ...direct, matchType: 'url' });

    const hostHits = hostMap.get(hostKey) || [];
    hostHits.forEach((hit) => matches.push({ ...hit, matchType: 'host' }));

    return {
      source: 'URLHaus (online feed)',
      refreshedAt,
      listed: matches.length > 0,
      matches: matches.slice(0, 5),
    };
  }
}

export class OsintService {
  constructor() {
    this.urlhaus = new UrlhausCache();
  }

  async checkPhishFeed(targetUrl) {
    const normalized = normalizeUrl(targetUrl);
    if (!normalized) throw new Error('Invalid URL');

    const parsed = new URL(normalized);
    const target = parsed.hostname.toLowerCase();

    const resp = await fetchWithTimeout(`${PHISH_API}${encodeURIComponent(target)}`, {
      method: 'GET',
    });

    if (!resp.ok) throw new Error(`phish.sinking.yachts responded with ${resp.status}`);
    const text = (await resp.text()).trim().toLowerCase();
    const flagged = text === 'true';

    return { source: 'phish.sinking.yachts', flagged };
  }

  async inspectUrl(rawUrl) {
    const normalizedUrl = normalizeUrl(rawUrl);
    if (!normalizedUrl) {
      const error = 'Enter a valid URL (example: https://example.com).';
      return { ok: false, error };
    }

    const parsed = new URL(normalizedUrl);
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();

    const [phishRes, urlhausRes] = await Promise.allSettled([
      this.checkPhishFeed(normalizedUrl),
      this.urlhaus.check(normalizedUrl),
    ]);

    const sources = {
      phishFeed:
        phishRes.status === 'fulfilled'
          ? phishRes.value
          : { source: 'phish.sinking.yachts', error: phishRes.reason?.message || 'Lookup failed' },
      urlhaus:
        urlhausRes.status === 'fulfilled'
          ? urlhausRes.value
          : { source: 'URLHaus', error: urlhausRes.reason?.message || 'Lookup failed' },
    };

    return {
      ok: true,
      host,
      normalizedUrl,
      sources,
      fetchedAt: Date.now(),
    };
  }

  async inspectText(text) {
    const urls = extractUrlsFromText(text);
    const limited = urls.slice(0, MAX_TEXT_URLS);
    const results = await Promise.all(
      limited.map(async (url) => {
        try {
          return await this.inspectUrl(url);
        } catch (error) {
          return { ok: false, error: error?.message || 'Lookup failed', url };
        }
      }),
    );

    return {
      ok: true,
      urls: results,
      truncated: urls.length > limited.length,
      found: urls.length,
    };
  }
}

export const osintService = new OsintService();
