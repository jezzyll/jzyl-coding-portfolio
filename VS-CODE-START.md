# Open and preview in VS Code

Open this folder with **File → Open Folder**. No build step, framework, or npm install is required. Python 3 is the only preview dependency.

In the integrated terminal, run:

```sh
python3 -m http.server 5500 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:5500/. Stop with Ctrl+C. Alternatively use **Terminal → Run Task → Preview portfolio** (stop it with **Terminate Task**). If port 5500 is busy, stop the old preview or choose another port.

Edit `dist/index.html` for content, `dist/styles.css` for appearance, `dist/app.js` for interactions, and `dist/assets/` for assets. Save and refresh the browser. Keep asset URLs relative (`assets/...`, `styles.css`, `app.js`) so both root URLs and GitHub repository subpaths work. Avoid opening index.html directly with file://.

Optional: VS Code Live Server is configured to serve `/dist`; do not run it on the same port as the Python server.

Test narrow/mobile and desktop widths, both themes, filters, project dialogs, Escape, Tab, Cmd/Ctrl+K and arrow/Enter navigation, résumé download, and contact draft. The contact form opens an email application; it does not send mail itself.
