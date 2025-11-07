# TechStack Sniffer — README

*Peek behind the curtain. See what powers the web. Sniff responsibly.* 🕵️‍♂️🦅

---

## 💡 Overview

**TechStack Sniffer** is a developer-friendly reconnaissance tool that fingerprints websites, uncovers their frameworks, and can optionally sniff open ports — without the noise of intrusive scanners. It’s designed for engineers who want fast, accurate stack visibility for audits, migration prep, and secure deployment checks.

Use it to:

* Identify web technologies, servers, and CDNs powering any domain.
* Verify configuration drift across your own infrastructure.
* Run safe open-port and TLS-version scans before going live.
* Generate JSON or Markdown reports for documentation or dashboards.

> ⚠️ **Ethical reminder:** scan only what you own or have permission for.

---

## ✨ Features

* ✅ Detects web servers, frameworks, CMSs, JavaScript libraries, TLS versions
* ✅ Optional safe port scan (rate-limited, no exploits)
* ✅ Finds CDN/WAF signatures (Cloudflare, Akamai, Fastly, etc.)
* ✅ DNS lookup (A, MX, SPF, DKIM)
* ✅ Outputs JSON + pretty Markdown summaries
* ✅ Optional web dashboard with scan history
* ✅ Docker-ready — single-command deployment
* ✅ Plugin system for custom detectors

---

## ⚙️ Quick Start

### Docker

```bash
docker build -t techstack-sniffer .
docker run --rm techstack-sniffer scan --target example.com --ports 22,80,443 --pretty
```

### Local Python

```bash
git clone https://github.com/yourorg/techstack-sniffer.git
cd techstack-sniffer
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python -m techstack_sniffer scan --target example.com --output report.json
```

---

## 🧭 CLI Usage

```
Usage: techstack-sniffer scan [OPTIONS]

Options:
  --target TEXT         Target hostname or IP (required)
  --ports TEXT          Comma-separated ports (default: common web ports)
  --timeout INT         Timeout per probe (default: 6)
  --max-concurrency INT Concurrent probes (default: 20)
  --no-port-scan        Disable active port scanning
  --output TEXT         Output path for JSON report
  --pretty              Print Markdown summary
  --dashboard           Send results to local dashboard
```

Example:

```bash
techstack-sniffer scan --target aygroup.app --ports 80,443,51820 --pretty
```

---

## 📊 Dashboard (optional)

Run the dashboard for history and collaboration:

```bash
docker compose up -d
# Visit http://localhost:5000
```

Features:

* Target list + last scan timestamps
* Diff view (changes between scans)
* Export reports (JSON, CSV)
* Role-based access control

---

## 📘 Sample Output

```
TechStack Sniffer Report — skygate.mazinyahia.com
------------------------------------------------
IP: 38.242.211.249
HTTP: 200 OK
Server: Apache/2.4.57 (Ubuntu)
TLS: TLSv1.3, Let's Encrypt R3
CDN: None
Detected JS:
  • React (react-refresh)
  • Next.js (server headers)
DNS:
  • A → 38.242.211.249
  • MX → mailhub.mazinyahia.com
Open Ports:
  • 22/tcp open
  • 80/tcp open
  • 443/tcp open
  • 51820/udp filtered
Recommendations:
  • Add HSTS header  
  • Update jQuery (3.3.1 → 3.6+)
```

---

## 🧩 Extending Detectors

Add new detectors under `detectors/` following the `Detector` interface:

```python
class Detector:
    name = "ExampleDetector"
    async def detect(self, response):
        # Return list of matches or None
        ...
```

Register your detector in `detector_registry.py`.

---

## 🛡️ Safe Scanning

Default mode is passive + minimal active probing.
No brute force, no exploits. Respect rate limits, log your scans, and stay compliant.

---

## 🔮 Roadmap

1. Add WebSocket and HTTP/3 detection
2. Public REST API for integrations
3. Flutter companion app (mobile trigger & reports)
4. Historical diff graphing in dashboard
5. OAuth + 2FA for dashboard security

---

## 🧑‍💻 Contributing

* Fork and PR with tests (`pytest`)
* Keep detectors stateless and fast
* Follow PEP 8 + type hints

---

## 📄 License

MIT License — free to use, fork, and build on. Credit appreciated.

---

## ☕ Author

Built with caffeine and curiosity by **Eng.Mazin Yahia**.
If it helped, drop a ⭐ on GitHub or send feedback — improvements welcome.
