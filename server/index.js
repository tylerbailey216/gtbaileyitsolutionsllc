import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { orchestrator } from './orchestrator.js';
import { config, ensureConfig } from './config.js';
import { osintService } from './osint.js';

ensureConfig();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.use(express.static(publicDir));

app.post('/api/chat', async (req, res) => {
  const { sessionId, message } = req.body ?? {};

  try {
    const result = await orchestrator.handleMessage({
      sessionId,
      userMessage: message,
    });

    res.json(result);
  } catch (error) {
    console.error('[chat:error]', error);

    res.status(500).json({
      sessionId,
      reply:
        "Something glitched on my end while pulling in support notes. Let's give that another shot in a moment.",
      metadata: { usedModels: [] },
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    offlineOnly: Boolean(config.offlineOnly),
  });
});

app.post('/api/osint/text', async (req, res) => {
  const text = (req.body?.text || '').toString();
  if (!text.trim()) {
    res.status(400).json({ ok: false, error: 'Missing text' });
    return;
  }

  try {
    const intel = await osintService.inspectText(text);
    res.json(intel);
  } catch (error) {
    console.error('[osint-text:error]', error);
    res.status(500).json({
      ok: false,
      error: 'Unable to reach open-source intel feeds right now.',
      detail: error?.message,
    });
  }
});

app.post('/api/osint/link', async (req, res) => {
  const target = (req.body?.url || '').trim();
  if (!target) {
    res.status(400).json({ ok: false, error: 'Missing url' });
    return;
  }

  try {
    const intel = await osintService.inspectUrl(target);
    res.json(intel);
  } catch (error) {
    console.error('[osint:error]', error);
    res.status(500).json({
      ok: false,
      error: 'Unable to reach open-source intel feeds right now.',
      detail: error?.message,
    });
  }
});

app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(publicDir, 'index.html'));
    return;
  }
  next();
});

app.listen(config.port, () => {
  console.log(`[server] Tech Chat Buddy running on http://localhost:${config.port}`);
});
