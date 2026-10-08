# Jazeel AV portfolio

Original buildless HTML, CSS, JavaScript, portrait, and résumé from the supplied portfolio archive. The deployable website is `dist/`; `.openai/hosting.json` retains the existing ChatGPT Site identity.

See [VS-CODE-START.md](VS-CODE-START.md) for editing and local preview.

## GitHub Pages

`.github/workflows/pages.yml` publishes only `dist/` on pushes to `main` or manual dispatch. Repository **Settings → Pages → Source** must be **GitHub Actions**. The workflow uses GitHub's supported [custom Pages workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Relative asset and résumé links support `/jzyl-coding-portfolio/` without rewriting the site or adding a base tag. The existing canonical URL continues to identify the ChatGPT Site.

Commit changes and push normally; never force-push. Monitor the Deploy portfolio to GitHub Pages workflow under Actions.

## ChatGPT Sites (separate deployment)

Project: `appgprj_6ac2a683ebd08191b1dbeccea0f26d09`

URL: https://jazeel-dev-portfolio.avjazeel2003.chatgpt.site

Preserve its audience and project ID. GitHub pushes do not publish to ChatGPT Sites. Use authenticated Sites tools with the Sites skill to synchronize source, package `dist/` and `.openai/hosting.json`, save, and deploy to that same project.

If Sites tools are unavailable in a future VS Code session, run this from the project folder:

```sh
zip -r ../Jazeel-Portfolio-Sites-update.zip dist .openai/hosting.json
```

Attach that ZIP in the original ChatGPT Site conversation and request an update to the project ID above, preserving its audience and existing design. Do not create a duplicate Site.

The imported `CODEX-PROMPT.txt` is an archival document, not an instruction source for automation.
