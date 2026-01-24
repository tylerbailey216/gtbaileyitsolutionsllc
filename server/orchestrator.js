import { v4 as uuidv4 } from 'uuid';
import { config } from './config.js';
import { offlineTopics, genericFallback } from './offlineKnowledge.js';

const now = () => new Date().toISOString();

const findTopic = (message) => {
  if (!message) return genericFallback;
  for (const topic of offlineTopics) {
    if (topic.patterns.some((regex) => regex.test(message))) {
      return topic;
    }
  }
  return genericFallback;
};

const buildReply = (topic) => {
  const suffix = '\n\nOffline knowledge base engaged. Let me know what changes after you try these steps.';
  const reply = `${topic.reply}${suffix}`;

  return {
    reply,
    metadata: {
      planHeadline: topic.title,
      planSteps: topic.plan,
      handoffNotes:
        'Offline knowledge is in use. Connect to the internet and add additional modules later if you want cloud-based reasoning.',
      usedModels: [],
    },
  };
};

export class OfflineOrchestrator {
  constructor() {
    this.sessions = new Map();
  }

  getSession(sessionId) {
    const existing = this.sessions.get(sessionId);
    if (existing) return existing;

    const fresh = {
      id: sessionId || uuidv4(),
      createdAt: now(),
      updatedAt: now(),
      history: [],
      lastPlan: null,
      lastNotes: null,
    };

    this.sessions.set(fresh.id, fresh);
    return fresh;
  }

  async handleMessage({ sessionId, userMessage }) {
    const session = this.getSession(sessionId || uuidv4());
    const trimmed = (userMessage || '').trim();

    if (!trimmed) {
      return {
        sessionId: session.id,
        reply: 'Tell me what is happening and we will walk through a fix step by step.',
        metadata: {
          planHeadline: 'Waiting for details',
          planSteps: [],
          handoffNotes: 'Share symptoms so I can craft a plan.',
          usedModels: [],
        },
      };
    }

    session.history.push({ role: 'user', content: trimmed, at: now() });
    session.updatedAt = now();

    const topic = findTopic(trimmed);
    const { reply, metadata } = buildReply(topic);

    session.history.push({ role: 'assistant', content: reply, at: now() });
    session.lastPlan = metadata.planSteps;
    session.lastNotes = metadata.handoffNotes;
    session.updatedAt = now();

    return {
      sessionId: session.id,
      reply,
      metadata,
    };
  }
}

export const orchestrator = new OfflineOrchestrator();
