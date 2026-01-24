import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const reportsDir = path.join(projectRoot, "reports");
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
}

const jsonSources = [
    path.join(projectRoot, "tech_support_knowledgebase.json"),
    path.join(projectRoot, "tech_support_knowledgebase_links.json"),
];

const notesDir = path.join(projectRoot, "knowledge_notes");

const urls = new Set();

const addUrl = (value) => {
    if (!value || typeof value !== "string") {
        return;
    }
    const trimmed = value.trim();
    if (!trimmed.startsWith("http")) {
        return;
    }
    urls.add(trimmed);
};

const loadJsonFile = (filePath) => {
    try {
        const raw = fs.readFileSync(filePath, "utf8");
        return JSON.parse(raw);
    } catch (error) {
        console.warn(`Skipping ${filePath}: ${error.message}`);
        return [];
    }
};

const gatherFromRecord = (record = {}) => {
    const links = record.video_links || {};
    for (const value of Object.values(links)) {
        if (typeof value === "string") {
            addUrl(value);
        } else if (value && typeof value === "object") {
            addUrl(value.url);
            addUrl(value.playlist);
            addUrl(value.link);
        }
    }

    const response = record.response;
    if (typeof response === "string") {
        const matches = response.match(/https?:\/\/[^\s"']+/g) || [];
        matches.forEach(addUrl);
    }
};

// Load top-level JSON sources.
jsonSources.forEach((source) => {
    if (fs.existsSync(source)) {
        const records = loadJsonFile(source);
        records.forEach(gatherFromRecord);
    }
});

// Load notes JSON files.
if (fs.existsSync(notesDir)) {
    const noteFiles = fs.readdirSync(notesDir).filter((file) => file.toLowerCase().endsWith(".json"));
    noteFiles.forEach((file) => {
        const records = loadJsonFile(path.join(notesDir, file));
        if (Array.isArray(records)) {
            records.forEach(gatherFromRecord);
        } else if (records && typeof records === "object") {
            gatherFromRecord(records);
        }
    });
}

// Scrape explicit links from public/app.js (covers hard-coded Video tutorial anchors).
const appJsPath = path.join(projectRoot, "public", "app.js");
if (fs.existsSync(appJsPath)) {
    const appSource = fs.readFileSync(appJsPath, "utf8");
    const regex = /href="(https?:[^"]+)"/g;
    let match;
    while ((match = regex.exec(appSource)) !== null) {
        addUrl(match[1]);
    }
}

const TIMEOUT_MS = 6000;

const attemptRequest = async (url, method) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
        const response = await fetch(url, {
            method,
            redirect: "follow",
            referrer: "about:client",
            cache: "no-store",
            signal: controller.signal,
        });
        clearTimeout(timer);
        return response;
    } catch (error) {
        clearTimeout(timer);
        throw error;
    }
};

const checkUrl = async (url) => {
    const result = {
        url,
        ok: false,
        status: "unknown",
        note: "",
    };

    let response;
    try {
        response = await attemptRequest(url, "HEAD");
    } catch (error) {
        result.note = error.message;
    }

    if (!response || response.status === 405 || response.status === 501 || (response && !response.ok)) {
        try {
            response = await attemptRequest(url, "GET");
            if (response) {
                result.note = "";
            }
        } catch (error) {
            result.note = error.message;
            response = null;
        }
    }

    if (!response) {
        result.status = "unreachable";
        return result;
    }

    result.status = `${response.status} ${response.statusText}`;
    result.ok = response.ok;
    if (!response.ok && response.type === "opaqueredirect") {
        result.ok = true;
        result.note = "Received opaque redirect; treat as reachable.";
    } else if (!response.ok) {
        result.note = "Non-success response";
    }

    return result;
};

const main = async () => {
    if (!urls.size) {
        console.log("No links found to verify.");
        return;
    }

    console.log(`Checking ${urls.size} links...`);

    const results = [];
    for (const url of urls) {
        const outcome = await checkUrl(url);
        results.push(outcome);
        const statusLabel = outcome.ok ? "OK" : "FAIL";
        console.log(`${statusLabel.padEnd(5)} ${url} (${outcome.status})${outcome.note ? ` - ${outcome.note}` : ""}`);
    }

    const summary = {
        generatedAt: new Date().toISOString(),
        totals: {
            checked: results.length,
            ok: results.filter((item) => item.ok).length,
            failed: results.filter((item) => !item.ok).length,
        },
        links: results.sort((a, b) => a.url.localeCompare(b.url)),
    };

    const reportPath = path.join(reportsDir, "link-status.json");
    fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2), "utf8");
    console.log(`\nReport saved to ${path.relative(projectRoot, reportPath)}`);
};

main().catch((error) => {
    console.error("Link check failed:", error);
    process.exit(1);
});
