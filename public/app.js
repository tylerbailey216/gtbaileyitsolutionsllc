(() => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    let userInteracted = false;
    const markInteracted = () => {
        userInteracted = true;
    };
    ['touchstart', 'pointerdown', 'wheel', 'keydown'].forEach((eventName) => {
        window.addEventListener(eventName, markInteracted, { passive: true });
    });
    const forceTop = () => {
        if (userInteracted || window.location.hash) return;
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };
    window.addEventListener('load', () => {
        forceTop();
        setTimeout(forceTop, 180);
    });
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            forceTop();
        }
    });

    const updateVisitCounter = async () => {
        const valueEl = document.getElementById('visitCounterValue');
        if (!valueEl) return;
        const statusEl = document.getElementById('visitCounterStatus');
        try {
            const endpoint = 'https://api.counterapi.dev/v1/gtbaileyitsolutionsllc/visits/up';
            const response = await fetch(endpoint, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Counter request failed');
            }
            const data = await response.json();
            if (typeof data.count === 'number') {
                valueEl.textContent = data.count.toLocaleString();
                if (statusEl) {
                    statusEl.textContent = 'Global counter updated.';
                }
                return;
            }
            throw new Error('Counter response missing count');
        } catch (error) {
            let count = 1;
            try {
                const key = 'gtb_visit_count_local';
                const stored = parseInt(localStorage.getItem(key) || '0', 10);
                count = Number.isNaN(stored) ? 1 : stored + 1;
                localStorage.setItem(key, String(count));
            } catch {
                count = 1;
            }
            valueEl.textContent = count.toLocaleString();
            if (statusEl) {
                statusEl.textContent = 'Offline: showing a local fallback count.';
            }
        }
    };

    updateVisitCounter();

    const lineWrap = (text = '') => text.replace(/\s+/g, ' ').trim();

    // Convert URLs in text to clickable links
    const linkify = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url) => {
            return `<a href="${url}" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: underline;">${url}</a>`;
        });
    };

    const formatBlock = (block) => {
        const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
        if (!lines.length) {
            return '';
        }
        const numbered = lines.every((line) => /^\d+\./.test(line));
        if (numbered) {
            const items = lines.map((line) => `<li>${line.replace(/^\d+\.\s*/, '')}</li>`).join('');
            return `<ol>${items}</ol>`;
        }
        const bulleted = lines.every((line) => line.startsWith('- '));
        if (bulleted) {
            const items = lines.map((line) => `<li>${line.replace(/^-\s*/, '')}</li>`).join('');
            return `<ul>${items}</ul>`;
        }
        return `<p>${lines.join(' ')}</p>`;
    };

    const formatResponse = (text = '') => {
        if (!text) {
            return '';
        }

        const lines = text
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean);

        const summary = [];
        const steps = [];
        let currentStep = null;

        lines.forEach((line) => {
            const match = line.match(/^(\d+)\.\s*(.+)/);
            if (match) {
                if (currentStep) {
                    steps.push(currentStep);
                }
                currentStep = {
                    index: match[1],
                    title: match[2],
                    detail: [],
                };
            } else if (currentStep) {
                currentStep.detail.push(line);
            } else {
                summary.push(line);
            }
        });

        if (currentStep) {
            steps.push(currentStep);
        }

        const summaryHtml = summary
            .map((para) => `<p class="plan-blurb">${linkify(para)}</p>`)
            .join('');

        const stepsHtml = steps.length
            ? `<div class="plan-grid">${steps
                  .map(
                      (step) => `<article class="plan-card">
                            <div class="plan-step">${step.index}</div>
                            <div class="plan-card-body">
                                <h3>${linkify(step.title)}</h3>
                                ${
                                    step.detail.length
                                        ? `<p>${linkify(step.detail.join(' '))}</p>`
                                        : ''
                                }
                            </div>
                        </article>`,
                  )
                  .join('')}</div>`
            : '';

        return summaryHtml + stepsHtml;
    };

    const initGuidedHelper = () => {
        const select = document.getElementById('symptomSelect');
        const findBtn = document.getElementById('symptomFind');
        const matchList = document.getElementById('matchList');
        const matchResult = document.getElementById('matchResult');
        if (!select || !matchList || !matchResult) {
            return;
        }

        const knowledge = window.OFFLINE_KNOWLEDGE;
        const topics = knowledge?.topics ? [...knowledge.topics] : [];
        const fallback = knowledge?.generic;

        const escapeHtml = (value = '') =>
            value
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');

        if (!topics.length) {
            matchResult.innerHTML = '<p class="node-summary">Support guide unavailable. Please reload the page or contact GT Bailey Support.</p>';
            return;
        }

        topics.sort((a, b) => a.title.localeCompare(b.title));
        select.innerHTML = '<option value="">Select a symptom</option>' +
            topics.map((topic) => `<option value="${escapeHtml(topic.id)}">${escapeHtml(topic.title)}</option>`).join('');

        const tokenize = (value = '') =>
            value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, ' ')
                .trim()
                .split(/\s+/)
                .filter(Boolean);

        const signature = (topic) => new Set(tokenize(`${topic.title} ${topic.id}`));
        const signatureMap = new Map();
        topics.forEach((topic) => {
            signatureMap.set(topic.id, signature(topic));
        });

        const similarity = (a, b) => {
            let shared = 0;
            a.forEach((token) => {
                if (b.has(token)) shared += 1;
            });
            const union = a.size + b.size - shared;
            return union === 0 ? 0 : shared / union;
        };

        const summarize = (text = '') => {
            const firstLine = text.split('\n').map((line) => line.trim()).find(Boolean) || '';
            const trimmed = firstLine.length > 140 ? `${firstLine.slice(0, 137)}...` : firstLine;
            return trimmed || 'Follow the steps below for a quick fix.';
        };

        const renderResult = (topic) => {
            if (!topic && fallback) {
                matchResult.innerHTML = `<h3>${escapeHtml(fallback.title)}</h3>${formatResponse(fallback.reply)}`;
                return;
            }
            if (!topic) {
                matchResult.innerHTML = '<p class="node-summary">Choose a match to see the step-by-step fix.</p>';
                return;
            }

            const planHtml = topic.plan?.length
                ? `<div class="plan-grid">${topic.plan
                      .map(
                          (step, index) =>
                              `<article class="plan-card">
                                    <div class="plan-step">${index + 1}</div>
                                    <div class="plan-card-body">
                                        <h3>${escapeHtml(step.step || 'Step')}</h3>
                                        ${step.rationale ? `<p>${escapeHtml(step.rationale)}</p>` : ''}
                                    </div>
                                </article>`,
                      )
                      .join('')}</div>`
                : '';

            matchResult.innerHTML = `
                <h3>${escapeHtml(topic.title)}</h3>
                ${formatResponse(topic.reply)}
                ${planHtml}
            `;
            matchResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        const renderMatches = () => {
            const selectedId = select.value;
            if (!selectedId) {
                matchList.innerHTML = '';
                matchResult.innerHTML = '<p class="node-summary">Pick a symptom above to see the closest fixes.</p>';
                return;
            }

            const selected = topics.find((topic) => topic.id === selectedId);
            if (!selected) {
                matchList.innerHTML = '';
                renderResult(null);
                return;
            }
            const baseTokens = signatureMap.get(selected.id) || new Set();
            const ranked = topics
                .map((topic) => ({
                    topic,
                    score: topic.id === selected.id ? 1 : similarity(baseTokens, signatureMap.get(topic.id) || new Set()),
                }))
                .sort((a, b) => b.score - a.score);

            const matches = ranked.slice(0, 3);
            matchList.innerHTML = matches
                .map((match, index) => {
                    const label = index === 0 ? 'Closest match' : 'Alternate match';
                    return `<article class="match-card">
                        <p class="node-path">${label}</p>
                        <h3>${escapeHtml(match.topic.title)}</h3>
                        <p>${escapeHtml(summarize(match.topic.reply || ''))}</p>
                        <button class="ghost" type="button" data-id="${escapeHtml(match.topic.id)}">Use this fix</button>
                    </article>`;
                })
                .join('');

            matchList.querySelectorAll('button[data-id]').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const match = topics.find((topic) => topic.id === btn.dataset.id);
                    renderResult(match);
                });
            });

            matchResult.innerHTML = '<p class="node-summary">Choose the closest match to see your fix list.</p>';
        };

        const startBtn = document.getElementById('startTree');
        startBtn?.addEventListener('click', () => {
            document.getElementById('treePanel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        renderMatches();
        select.addEventListener('change', renderMatches);
        findBtn?.addEventListener('click', renderMatches);
    };

    initGuidedHelper();

    // Affirmations / virtual phone loop
    (() => {
        const affirmations = [
            { tag: 'Grounding', text: 'Your calm presence is a diagnostic tool - breathe and let the next step appear.', source: '- GT Bailey Support' },
            { tag: 'Confidence', text: 'You have navigated harder days. Trust the resilience you already built.', source: '- GT Bailey Support' },
            { tag: 'Leadership', text: 'Lead with curiosity, not perfection. Ask the question that unlocks momentum.', source: '- GT Bailey Support' },
            { tag: 'Release', text: 'Unclench your jaw. Breathe into the space you just made.', source: '- GT Bailey Support' },
            { tag: 'Reset', text: 'Hydrate, stretch, then reset your focus. Your mind needs its own buffer.', source: '- GT Bailey Support' },
            { tag: 'Connection', text: 'Joy is contagious. Share one tiny win before you close your notebook.', source: '- GT Bailey Support' },
            { tag: 'Focus', text: 'Silence the notifications. Give your attention to one thing that matters.', source: '- GT Bailey Support' },
            { tag: 'Perspective', text: 'You are not behind; you are pacing yourself for a longer season.', source: '- GT Bailey Support' },
            { tag: 'Calm', text: 'One calm breath can reset the whole room. Start there.', source: '- GT Bailey Support' },
            { tag: 'Progress', text: 'Progress counts even when it is small and quiet.', source: '- GT Bailey Support' },
            { tag: 'Clarity', text: 'You are allowed to ask for clarity. It is a strength.', source: '- GT Bailey Support' },
            { tag: 'Ease', text: 'Keep your shoulders soft. Your mind works better with less tension.', source: '- GT Bailey Support' },
            { tag: 'Experience', text: 'You have solved problems like this before. The path will show up.', source: '- GT Bailey Support' },
            { tag: 'Momentum', text: 'Set one tiny goal, finish it, then pick the next.', source: '- GT Bailey Support' },
            { tag: 'Patience', text: 'Your patience protects the customer and your own energy.', source: '- GT Bailey Support' },
            { tag: 'Kindness', text: 'Kind words to yourself are also part of the fix.', source: '- GT Bailey Support' },
            { tag: 'Boundaries', text: 'Boundaries are professional. You can say no and still care.', source: '- GT Bailey Support' },
            { tag: 'Steadiness', text: 'You do not need to rush. You need to be steady.', source: '- GT Bailey Support' },
            { tag: 'Gratitude', text: 'Gratitude for one small win builds momentum.', source: '- GT Bailey Support' },
            { tag: 'Rest', text: 'Rest is part of good work. Take a sip of water.', source: '- GT Bailey Support' },
        ];
        const tagEl = document.getElementById('affirmationTag');
        const textEl = document.getElementById('affirmationText');
        const srcEl = document.getElementById('affirmationSource');
        const timeEl = document.getElementById('affirmationTime');
        const nextBtn = document.getElementById('affirmationNext');
        let idx = 0;
        let cycleTimer = null;

        if (!tagEl || !textEl || !srcEl) {
            return;
        }

        const updateTime = () => {
            if (!timeEl) return;
            const date = new Date();
            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            timeEl.textContent = `${hours}:${minutes} ${ampm}`;
        };

        const renderAffirmation = () => {
            const a = affirmations[idx % affirmations.length];
            tagEl.textContent = a.tag;
            textEl.textContent = a.text;
            srcEl.textContent = a.source;
        };

        const nextAffirmation = () => {
            idx = (idx + 1) % affirmations.length;
            renderAffirmation();
        };

        const startCycle = () => {
            cycleTimer = setInterval(nextAffirmation, 8000);
        };

        const resetCycle = () => {
            clearInterval(cycleTimer);
            startCycle();
        };

        updateTime();
        renderAffirmation();
        setInterval(updateTime, 15000);
        startCycle();
        nextBtn?.addEventListener('click', () => {
            nextAffirmation();
            resetCycle();
        });

        const stage = document.querySelector('[data-role=\"affirmation-stage\"]');
        const rig = document.querySelector('[data-role=\"affirmation-rig\"]');
        if (stage && rig) {
            let rotationX = -6;
            let rotationY = 12;
            let activePointerId = null;
            let isDragging = false;
            let lastPointerX = 0;
            let lastPointerY = 0;
            const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
            const applyTransform = () => {
                rig.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
            };
            const resetTilt = () => {
                rotationX = -6;
                rotationY = 12;
                applyTransform();
            };

            const beginPointerDrag = (event) => {
                if (event.button !== undefined && event.button !== 0) {
                    return;
                }
                event.preventDefault();
                isDragging = true;
                activePointerId = event.pointerId;
                lastPointerX = event.clientX;
                lastPointerY = event.clientY;
                stage.setPointerCapture?.(event.pointerId);
            };

            const handlePointerMove = (event) => {
                if (!isDragging || event.pointerId !== activePointerId) {
                    return;
                }
                const deltaX = event.clientX - lastPointerX;
                const deltaY = event.clientY - lastPointerY;
                rotationY = clamp(rotationY + deltaX * 0.2, -22, 22);
                rotationX = clamp(rotationX - deltaY * 0.2, -18, 18);
                applyTransform();
                lastPointerX = event.clientX;
                lastPointerY = event.clientY;
            };

            const endPointerDrag = (event) => {
                if (!isDragging || event.pointerId !== activePointerId) {
                    return;
                }
                isDragging = false;
                activePointerId = null;
                stage.releasePointerCapture?.(event.pointerId);
                resetTilt();
            };

            stage.addEventListener('pointerdown', beginPointerDrag, { passive: false });
            stage.addEventListener('pointermove', handlePointerMove);
            stage.addEventListener('pointerup', endPointerDrag);
            stage.addEventListener('pointercancel', endPointerDrag);
            stage.addEventListener('pointerleave', endPointerDrag);
            applyTransform();
        }
    })();
})();

const initBusinessCardInteraction = () => {
    const stage = document.getElementById('businessCardStage');
    const card = document.getElementById('businessCard');
    if (!stage || !card) {
        return false;
    }

    let activePointerId = null;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let rotationX = -6;
    let rotationY = 12;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const applyTransform = () => {
        card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    };
    const resetTilt = () => {
        rotationX = -6;
        rotationY = 12;
        applyTransform();
    };

    const beginPointerDrag = (event) => {
        if (event.button !== undefined && event.button !== 0) {
            return;
        }
        event.preventDefault();
        isDragging = true;
        activePointerId = event.pointerId;
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
        stage.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (!isDragging || event.pointerId !== activePointerId) {
            return;
        }
        const deltaX = event.clientX - lastPointerX;
        const deltaY = event.clientY - lastPointerY;
        rotationY = clamp(rotationY + deltaX * 0.3, -25, 25);
        rotationX = clamp(rotationX - deltaY * 0.3, -20, 20);
        applyTransform();
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
    };

    const endPointerDrag = (event) => {
        if (!isDragging || event.pointerId !== activePointerId) {
            return;
        }
        isDragging = false;
        activePointerId = null;
        stage.releasePointerCapture?.(event.pointerId);
        resetTilt();
    };

    stage.addEventListener('pointerdown', beginPointerDrag, { passive: false });
    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerup', endPointerDrag);
    stage.addEventListener('pointercancel', endPointerDrag);
    stage.addEventListener('pointerleave', endPointerDrag);

    applyTransform();
    return true;
};

(() => {
    const body = document.body;
    const toggle = document.getElementById('themeToggle');
    if (body) {
        body.classList.add('theme-light');
        try {
            localStorage.setItem('gtb-theme', 'light');
        } catch {}
    }
    const apply = () => {
        const isLight = body.classList.contains('theme-light');
        try {
            localStorage.setItem('gtb-theme', isLight ? 'light' : 'dark');
        } catch {}
    };
    toggle?.addEventListener('click', () => {
        body.classList.toggle('theme-light');
        apply();
    });

    initBusinessCardInteraction();
})();


