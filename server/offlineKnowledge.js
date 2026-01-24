import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knowledgePath = path.resolve(__dirname, '../public/data/offline-knowledge.json');
const knowledgeRaw = fs.readFileSync(knowledgePath, 'utf-8');
const knowledge = JSON.parse(knowledgeRaw);

export const offlineTopics = (knowledge.topics || []).map((topic) => ({
  ...topic,
  patterns: (topic.patterns || []).map((pattern) => new RegExp(pattern, 'i')),
}));

export const genericFallback = knowledge.generic || {
  id: 'general-playbook',
  title: 'General troubleshooting checklist',
  reply:
    'Restart the device and gather error details. Once the orchestrator is online, I can share a richer troubleshooting plan.',
  plan: [],
};
