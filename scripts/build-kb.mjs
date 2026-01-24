import fs from "fs";
import path from "path";

const sources = [
  'tech_support_knowledgebase.json',
  'tech_support_knowledgebase_links.json'
];

const notesDir = 'knowledge_notes';
if (fs.existsSync(notesDir)) {
  const noteFiles = fs.readdirSync(notesDir).filter((file) => file.toLowerCase().endsWith('.json'));
  noteFiles.forEach((file) => {
    sources.push(path.join(notesDir, file));
  });
}

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const sanitize = (text = '') => text
  .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
  .replace(/[\u201C\u201D\u201E]/g, '"')
  .replace(/[\u2014\u2013]/g, '-')
  .replace(/[\u2026]/g, '...')
  .replace(/[\u2122]/g, 'TM')
  .replace(/[\u00AE]/g, '(R)')
  .replace(/[\u00A0]/g, ' ')
  .replace(/[\u00B7]/g, '-')
  .replace(/\s+/g, ' ')
  .trim();
const escapeTemplate = (text = '') => sanitize(text)
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$/g, '\\$');

const merged = new Map();

for (const source of sources) {
  if (!fs.existsSync(source)) continue;
  const raw = fs.readFileSync(source, 'utf8');
  let records = [];
  try {
    records = JSON.parse(raw);
  } catch (error) {
    console.error(`Failed to parse ${source}:`, error.message);
    process.exit(1);
  }

  records.forEach((entry) => {
    const key = entry.intent;
    if (!key) return;
    if (!merged.has(key)) {
      merged.set(key, {
        intent: key,
        triggers: new Set(),
        response: '',
        categories: new Set(),
        video_links: {},
      });
    }
    const target = merged.get(key);

    (entry.triggers || []).forEach((trigger) => {
      const norm = sanitize(trigger.toLowerCase());
      if (norm) target.triggers.add(norm);
    });

    const response = sanitize(entry.response || '');
    if (response && response.length > target.response.length) {
      target.response = response;
    }

    (entry.categories || []).forEach((cat) => {
      const normCat = sanitize(cat);
      if (normCat) target.categories.add(normCat.toLowerCase());
    });

    Object.entries(entry.video_links || {}).forEach(([label, urlValue]) => {
      const normLabel = sanitize(label);
      if (!normLabel) {
        return;
      }

      let link = '';
      if (typeof urlValue === 'string') {
        link = sanitize(urlValue);
      } else if (urlValue && typeof urlValue === 'object') {
        if (typeof urlValue.url === 'string') {
          link = sanitize(urlValue.url);
        } else if (typeof urlValue.playlist === 'string') {
          link = sanitize(urlValue.playlist);
        }
      }

      if (link) {
        target.video_links[normLabel] = link;
      }
    });
  });
}

const topics = Array.from(merged.values())
  .sort((a, b) => a.intent.localeCompare(b.intent))
  .map((entry) => {
    const title = entry.intent
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const patterns = Array.from(entry.triggers).map((trigger) => {
      const escaped = escapeRegex(trigger);
      return `new RegExp("${escaped}", "i")`;
    });

    const videoLinksMarkup = Object.entries(entry.video_links)
      .map(([label, url]) => {
        const safeLabel = escapeTemplate(label);
        const safeUrl = sanitize(url);
        if (!safeUrl) {
          return '';
        }
        return `<a href="${safeUrl}" target="_blank" rel="noopener">${safeLabel}</a>`;
      })
      .filter(Boolean)
      .join(' | ');

    const videoText = videoLinksMarkup ? `\nVideo resources: ${videoLinksMarkup}` : '';

    const reply = escapeTemplate(entry.response) + videoText;
    const focus = Array.from(entry.categories);

    return `  {\n    id: '${entry.intent}',\n    title: '${title}',\n    patterns: [\n      ${patterns.join(',\n      ')}\n    ],\n    reply: \`${reply}\`,\n    plan: [\n      {\n        step: 'Key actions',\n        rationale: 'Follow this guidance to address the reported symptom.',\n        focus: ${JSON.stringify(focus)}\n      }\n    ]\n  }`;
  });

const block = `// tech_support_knowledgebase auto-generated\nconst KNOWLEDGE_BASE_TOPICS = [\n${topics.join(',\n')}\n];\nOFFLINE_TOPICS.push(...KNOWLEDGE_BASE_TOPICS);\n`;

const appFile = 'public/app.js';
const appContent = fs.readFileSync(appFile, 'utf8');
const marker = '// tech_support_knowledgebase auto-generated';
const genericMarker = 'const GENERIC_TOPIC = {';
const start = appContent.indexOf(marker);
if (start === -1) {
  console.error('Marker not found in public/app.js');
  process.exit(1);
}
const end = appContent.indexOf(genericMarker, start);
if (end === -1) {
  console.error('GENERIC_TOPIC marker not found in public/app.js');
  process.exit(1);
}
const newContent = appContent.slice(0, start) + block + '\n' + appContent.slice(end);
fs.writeFileSync(appFile, newContent);
console.log(`Knowledge base merged from ${sources.length} sources -> ${merged.size} intents.`);
