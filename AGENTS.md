# AGENTS.md

Instructions for coding agents working on games: the landing page for bborbe's browser games.

## Layout

| Path | Role |
|---|---|
| `index.html` | The page: header, the empty `<ul id="games">`, footer, loads `games.js` then `app.js`. |
| `games.js` | The single source of the game list — one object per game (`id`, `name`, `description`, `play`, `source`, `thumb`). Adding a game is one entry here. |
| `app.js` | Renders one card per `window.GAMES` entry into `#games`. No framework, no build. |
| `style.css` | Light/dark tokens under `prefers-color-scheme`, responsive card grid. |
| `thumbs/` | One 16:9 PNG per game. |
| `scripts/check.mjs` | Structure + link check, run by `make test` and by CI's `test` job. |

## Rules

- **Static only.** No framework, no bundler, no dependencies. Node is used only by `scripts/check.mjs`.
- **`games.js` is the only list.** Never hard-code a game in `index.html` or `app.js`.
- **Every entry has a working Play and Source link** — `make test` fails otherwise.
- **Follow the OS theme** — colours come from the CSS variables at the top of `style.css`, never a literal colour in a rule.
- **Mute every browser you drive** (`--mute-audio`) and close playwright when done.

## Workflow

Feature branch in a worktree + pull request into `master`, merged with a merge commit (`gh pr merge --merge`). Add a bullet under `## Unreleased` in `CHANGELOG.md`. `ci.yml` runs `make test` (the required `test` check); `pages.yml` deploys `master` to https://bborbe.github.io/games/.
