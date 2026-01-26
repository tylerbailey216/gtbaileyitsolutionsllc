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

        const stepCards = steps.map(
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
        );

        if (steps.length >= 3) {
            stepCards.splice(
                3,
                0,
                `<article class="plan-card stop-point">
                    <div class="plan-step">!</div>
                    <div class="plan-card-body">
                        <h3>Stop point after step 3</h3>
                        <p>If this didn't work, stop here - we'll help. Don't keep toggling random settings.</p>
                    </div>
                </article>`,
            );
        }

        const stepsHtml = steps.length ? `<div class="plan-grid">${stepCards.join('')}</div>` : '';

        return summaryHtml + stepsHtml;
    };

    const initHelpCenter = () => {
        const searchInput = document.getElementById('issueSearch');
        const clearBtn = document.getElementById('searchClear');
        const categoryGrid = document.getElementById('categoryGrid');
        const resultsGrid = document.getElementById('searchResults');
        const resultPanel = document.getElementById('matchResult');
        const tipEl = document.getElementById('helpTip');
        const quickPickGrid = document.getElementById('quickPickGrid');
        const quickPicksTitle = document.getElementById('quickPicksTitle');
        const quickPicksNote = document.getElementById('quickPicksNote');
        const helpCenterLabel = document.getElementById('helpCenterLabel');
        const platformTabs = Array.from(document.querySelectorAll('.platform-tab'));
        const supportSummary = document.getElementById('supportSummary');
        const supportNotes = document.getElementById('supportNotes');
        const supportName = document.getElementById('supportName');
        const supportContact = document.getElementById('supportContact');
        const supportDevice = document.getElementById('supportDevice');
        const supportCopy = document.getElementById('supportCopy');
        const supportClear = document.getElementById('supportClear');
        const supportHint = document.getElementById('supportHint');
        if (!searchInput || !categoryGrid || !resultsGrid || !resultPanel) {
            return;
        }

        const knowledge = window.OFFLINE_KNOWLEDGE || {};
        const allTopics = knowledge?.topics ? [...knowledge.topics] : [];
        const allCategories = knowledge?.categories ? [...knowledge.categories] : [];
        const allQuickPicks = knowledge?.quickPicks ? [...knowledge.quickPicks] : [];
        const platforms = knowledge?.platforms?.length
            ? [...knowledge.platforms]
            : [
                { id: 'windows', label: 'Windows' },
                { id: 'mac', label: 'Mac' },
                { id: 'iphone', label: 'iPhone' },
                { id: 'android', label: 'Android' },
            ];
        const fallback = knowledge?.generic;
        const tips = knowledge?.tips || [
            'Quick tip: Restarting the device fixes a lot of issues fast.',
            'Friendly reminder: Write down the exact error message if you see one.',
            'Tip: If more than one device is affected, check the router first.',
            'Tip: Keep your device plugged in during updates to avoid failures.',
        ];

        const escapeHtml = (value = '') =>
            value
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');

        const iconSvg = (content) =>
            `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${content}</svg>`;

        const quickPickIcons = {
            wifi: iconSvg('<path d="M4 9c4.5-4 11.5-4 16 0"/><path d="M7 12c3-2.7 7-2.7 10 0"/><path d="M10 15c1.5-1.3 3.5-1.3 5 0"/><circle cx="12" cy="18" r="1" fill="currentColor" stroke="none"/>'),
            slow: iconSvg('<path d="M5 14a7 7 0 1 1 14 0"/><path d="M12 14l4-3"/><circle cx="12" cy="14" r="1" fill="currentColor" stroke="none"/>'),
            lock: iconSvg('<rect x="6" y="11" width="12" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1" fill="currentColor" stroke="none"/>'),
            printer: iconSvg('<rect x="6" y="8" width="12" height="5" rx="1"/><rect x="5" y="13" width="14" height="6" rx="2"/><rect x="7" y="3" width="10" height="4" rx="1"/><circle cx="16.5" cy="15.5" r="0.9" fill="currentColor" stroke="none"/>'),
            update: iconSvg('<path d="M6 8a6 6 0 0 1 10-2"/><path d="M16 6v4h4"/><path d="M18 16a6 6 0 0 1-10 2"/><path d="M8 18v-4H4"/>'),
            warning: iconSvg('<path d="M12 4l9 16H3z"/><path d="M12 9v5"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/>'),
            signal: iconSvg('<path d="M5 18v-3"/><path d="M9 18v-5"/><path d="M13 18v-7"/><path d="M17 18v-9"/>'),
            snow: iconSvg('<path d="M12 4v16"/><path d="M6.5 7.5l11 9"/><path d="M17.5 7.5l-11 9"/>'),
            app: iconSvg('<rect x="5" y="6" width="14" height="12" rx="2"/><path d="M9 10l6 6"/><path d="M15 10l-6 6"/>'),
            dot: iconSvg('<circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>'),
        };

        const emojiIconMap = {
            '📶': 'wifi',
            '🐌': 'slow',
            '🔒': 'lock',
            '🖨️': 'printer',
            '🔄': 'update',
            '⚠️': 'warning',
            '📡': 'signal',
            '🧊': 'snow',
        };

        const getQuickPickIcon = (pick = {}) => {
            const iconKey = pick.icon || emojiIconMap[pick.emoji] || 'dot';
            return quickPickIcons[iconKey] || quickPickIcons.dot;
        };

        if (!allTopics.length) {
            resultPanel.innerHTML = '<p class="node-summary">Support guide unavailable. Please reload the page or contact GT Bailey Support.</p>';
            return;
        }

        let currentPlatform = platformTabs.find((tab) => tab.classList.contains('is-active'))?.dataset.platform || platforms[0]?.id || 'windows';
        let currentTopic = null;
        let topics = [];
        let categories = [];
        let topicMap = new Map();
        let categoryMap = new Map();

        const renderTip = () => {
            if (!tipEl) return;
            const nextTip = tips[Math.floor(Math.random() * tips.length)];
            tipEl.textContent = nextTip;
            tipEl.classList.add('is-visible');
        };

        const getPlatformLabel = (platformId) => platforms.find((platform) => platform.id === platformId)?.label || platformId;

        const extractSteps = (text = '') => {
            const lines = text
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean);
            const steps = [];
            let currentStep = null;
            lines.forEach((line) => {
                const match = line.match(/^(\d+)\.\s*(.+)/);
                if (match) {
                    if (currentStep) {
                        steps.push(currentStep);
                    }
                    currentStep = { index: match[1], title: match[2] };
                } else if (currentStep) {
                    return;
                }
            });
            if (currentStep) {
                steps.push(currentStep);
            }
            return steps;
        };

        const buildSupportSummary = (topic) => {
            const platformLabel = getPlatformLabel(currentPlatform);
            const topicTitle = topic?.title || 'Not selected yet';
            const steps = topic?.reply ? extractSteps(topic.reply).slice(0, 3) : [];
            const tried = steps.length
                ? steps.map((step) => `- ${step.title}`).join('\n')
                : '- (Add what you tried)';
            return `Device: ${platformLabel}\nIssue: ${topicTitle}\nWhat I tried:\n${tried}\n\nWhat I'm seeing:\n(Describe any message on screen + when it started)`;
        };

        const syncSupportSummary = (topic) => {
            if (!supportSummary) return;
            supportSummary.value = buildSupportSummary(topic);
        };

        const buildSupportMessage = () => {
            const name = supportName?.value.trim();
            const contact = supportContact?.value.trim();
            const notes = supportNotes?.value.trim();
            let summaryText = supportSummary?.value.trim();
            if (!summaryText) {
                summaryText = buildSupportSummary(currentTopic);
            }
            const header = [];
            if (name) header.push(`Name: ${name}`);
            if (contact) header.push(`Contact: ${contact}`);
            return `${header.join('\n')}${header.length ? '\n\n' : ''}${summaryText}${notes ? `\n\nExtra notes:\n${notes}` : ''}`;
        };

        const resolveVisualSrc = (src = '') => {
            if (!src) {
                return { primary: '', fallback: '' };
            }
            if (/^(https?:|data:)/i.test(src)) {
                return { primary: src, fallback: '' };
            }
            const normalized = src.replace(/^\.\/+/, './');
            if (normalized.includes('/public/')) {
                return {
                    primary: normalized,
                    fallback: normalized.replace('/public/', '/'),
                };
            }
            return {
                primary: normalized,
                fallback: `./public/${normalized.replace(/^\.\/+/, '')}`,
            };
        };

        const attachVisualFallbacks = () => {
            resultPanel.querySelectorAll('img[data-fallback]').forEach((img) => {
                const fallback = img.dataset.fallback;
                if (!fallback) {
                    img.removeAttribute('data-fallback');
                    return;
                }
                img.addEventListener('error', () => {
                    img.removeAttribute('data-fallback');
                    img.src = fallback;
                }, { once: true });
            });
        };

        const renderVisuals = (topic) => {
            if (!topic?.visuals?.length) {
                return '';
            }
            return `<div class="visual-grid">${topic.visuals
                .map((visual) => {
                    const { primary, fallback } = resolveVisualSrc(visual.src || '');
                    const fallbackAttr = fallback ? ` data-fallback="${escapeHtml(fallback)}"` : '';
                    return `<article class="visual-card">
                        <img src="${escapeHtml(primary)}"${fallbackAttr} alt="${escapeHtml(visual.alt || visual.title || 'Visual guide')}">
                        <span>${escapeHtml(visual.title || '')}</span>
                    </article>`;
                })
                .join('')}</div>`;
        };

        const renderTopic = (topic, { useFallback = false } = {}) => {
            if (!topic) {
                if (useFallback && fallback) {
                    resultPanel.innerHTML = `<h3>${escapeHtml(fallback.title)}</h3>${formatResponse(fallback.reply)}`;
                    return;
                }
                currentTopic = null;
                syncSupportSummary(null);
                resultPanel.innerHTML = '<p class="node-summary">Pick a symptom to see the step-by-step fix.</p>';
                return;
            }

            currentTopic = topic;
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

            resultPanel.innerHTML = `
                <h3>${escapeHtml(topic.title)}</h3>
                ${topic.summary ? `<p class="node-summary">${escapeHtml(topic.summary)}</p>` : ''}
                ${renderVisuals(topic)}
                ${formatResponse(topic.reply)}
                ${planHtml}
            `;
            attachVisualFallbacks();
            renderTip();
            syncSupportSummary(topic);
            resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        const renderQuickPicks = () => {
            if (!quickPickGrid) return;
            const platformLabel = getPlatformLabel(currentPlatform);
            if (quickPicksTitle) {
                quickPicksTitle.textContent = `Top 3 issues for ${platformLabel}`;
            }
            if (quickPicksNote) {
                quickPicksNote.textContent = 'Start with these common problems before searching.';
            }
            quickPickGrid.setAttribute('aria-label', `${platformLabel} top issues`);
            const picks = allQuickPicks.filter((pick) => pick.platformId === currentPlatform);
            const topPicks = picks.slice(0, 3);
            if (!topPicks.length) {
                quickPickGrid.innerHTML = '<p class="node-summary">Top issues are coming soon for this device.</p>';
                return;
            }
            const buttons = topPicks
                .map((pick) => {
                    const topic = topicMap.get(pick.topicId);
                    if (!topic) return '';
                    const label = pick.label || topic.title;
                    const sub = pick.sub || topic.summary || '';
                    const iconMarkup = getQuickPickIcon(pick);
                    return `<button class="quick-pick-btn" type="button" data-topic="${escapeHtml(topic.id)}">
                        <span class="quick-pick-icon" aria-hidden="true">${iconMarkup}</span>
                        <span class="quick-pick-text">
                            <span class="quick-pick-label">${escapeHtml(label)}</span>
                            ${sub ? `<span class="quick-pick-sub">${escapeHtml(sub)}</span>` : ''}
                        </span>
                    </button>`;
                })
                .filter(Boolean)
                .join('');
            quickPickGrid.innerHTML = buttons || '<p class="node-summary">Top issues are coming soon for this device.</p>';
        };

        const renderCategories = () => {
            const categoryCards = Array.from(categoryMap.values())
                .filter((category) => category.topics.length)
                .map((category) => {
                    const topicButtons = category.topics
                        .map(
                            (topic) => `<button class="symptom-btn" type="button" data-topic="${escapeHtml(topic.id)}">
                                <span class="symptom-title">${escapeHtml(topic.title)}</span>
                                <span class="symptom-summary">${escapeHtml(topic.summary || '')}</span>
                            </button>`,
                        )
                        .join('');
                    return `<article class="category-card">
                        <h3>${escapeHtml(category.title)}</h3>
                        <p>${escapeHtml(category.description || '')}</p>
                        <div class="symptom-list">${topicButtons}</div>
                    </article>`;
                })
                .join('');
            categoryGrid.innerHTML = categoryCards;
        };

        const buildIndex = (topic) => {
            const tokens = [
                topic.title,
                topic.summary,
                topic.reply,
                Array.isArray(topic.keywords) ? topic.keywords.join(' ') : '',
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return tokens;
        };

        const searchTopics = (query) => {
            const trimmed = query.trim().toLowerCase();
            if (!trimmed) return [];
            const tokens = trimmed.split(/\s+/).filter(Boolean);
            return topics.filter((topic) => {
                const haystack = buildIndex(topic);
                return tokens.every((token) => haystack.includes(token));
            });
        };

        const renderSearchResults = (query) => {
            const matches = searchTopics(query);
            if (!query.trim()) {
                resultsGrid.style.display = 'none';
                categoryGrid.style.display = 'grid';
                resultsGrid.innerHTML = '';
                return;
            }
            resultsGrid.style.display = 'grid';
            categoryGrid.style.display = 'none';

            if (!matches.length) {
                resultsGrid.innerHTML = '<p class="node-summary">No matches yet. Try a different keyword.</p>';
                return;
            }

            resultsGrid.innerHTML = matches
                .map(
                    (topic) => `<button class="symptom-btn" type="button" data-topic="${escapeHtml(topic.id)}">
                        <span class="symptom-title">${escapeHtml(topic.title)}</span>
                        <span class="symptom-summary">${escapeHtml(topic.summary || '')}</span>
                    </button>`,
                )
                .join('');
        };

        const applyPlatform = (platformId) => {
            currentPlatform = platformId;
            const platformLabel = getPlatformLabel(currentPlatform);
            if (helpCenterLabel) {
                helpCenterLabel.textContent = `${platformLabel} Help Center`;
            }
            if (supportDevice && !supportDevice.value.trim()) {
                supportDevice.value = platformLabel;
            }
            topics = allTopics.filter((topic) => topic.platformId === currentPlatform);
            categories = allCategories.filter((category) => category.platformId === currentPlatform);
            topicMap = new Map();
            topics.forEach((topic) => topicMap.set(topic.id, topic));
            categoryMap = new Map();
            categories.forEach((category) => {
                categoryMap.set(category.id, { ...category, topics: [] });
            });
            topics.forEach((topic) => {
                const bucket = categoryMap.get(topic.categoryId);
                if (bucket) {
                    bucket.topics.push(topic);
                }
            });
            renderQuickPicks();
            renderCategories();
            renderSearchResults(searchInput.value);
            renderTopic(null);
        };

        const bindTopicGrid = (grid) => {
            if (!grid) return;
            grid.addEventListener('click', (event) => {
                const btn = event.target.closest('[data-topic]');
                if (!btn) return;
                const topic = topicMap.get(btn.dataset.topic);
                renderTopic(topic);
            });
        };

        bindTopicGrid(quickPickGrid);
        bindTopicGrid(categoryGrid);
        bindTopicGrid(resultsGrid);

        platformTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                const platformId = tab.dataset.platform || 'windows';
                platformTabs.forEach((item) => {
                    const active = item === tab;
                    item.classList.toggle('is-active', active);
                    item.setAttribute('aria-selected', active ? 'true' : 'false');
                });
                applyPlatform(platformId);
            });
        });

        searchInput.addEventListener('input', () => {
            renderSearchResults(searchInput.value);
        });

        clearBtn?.addEventListener('click', () => {
            searchInput.value = '';
            renderSearchResults('');
            searchInput.focus();
        });

        const startBtn = document.getElementById('startTree');
        startBtn?.addEventListener('click', () => {
            document.getElementById('treePanel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        const searchBtn = document.getElementById('searchIssues');
        searchBtn?.addEventListener('click', () => {
            document.getElementById('treePanel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => searchInput.focus(), 250);
        });

        supportCopy?.addEventListener('click', async () => {
            const message = buildSupportMessage();
            if (!message.trim()) return;
            try {
                await navigator.clipboard.writeText(message);
                if (supportHint) {
                    supportHint.textContent = 'Copied! Paste this into your support message.';
                }
            } catch {
                if (supportHint) {
                    supportHint.textContent = 'Copy failed. You can still select the text and copy manually.';
                }
            }
        });

        supportClear?.addEventListener('click', () => {
            if (supportName) supportName.value = '';
            if (supportContact) supportContact.value = '';
            if (supportDevice) supportDevice.value = getPlatformLabel(currentPlatform);
            if (supportNotes) supportNotes.value = '';
            syncSupportSummary(currentTopic);
            if (supportHint) {
                supportHint.textContent = 'Tip: Copy the message and send it to GT Bailey IT using your preferred method.';
            }
        });

        if (platformTabs.length) {
            const activeTab = platformTabs.find((tab) => tab.classList.contains('is-active'));
            if (activeTab?.dataset.platform) {
                currentPlatform = activeTab.dataset.platform;
            }
        }
        applyPlatform(currentPlatform);
    };

    initHelpCenter();

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


