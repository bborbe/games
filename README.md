# games

Landing page for every browser game: **https://bborbe.github.io/games/**

One static page — no framework, no build step, no dependencies. `index.html` renders one card per entry in `games.js`; thumbnails live in `thumbs/`.

## Add a game

1. Append one entry to `GAMES` in `games.js` (`id`, `name`, `description`, `play`, `source`, `thumb`).
2. Drop a 16:9 PNG (640×360 or larger) into `thumbs/`.
3. Run `make test` — it checks the fields, the thumbnail and every link.

## Development

```bash
make serve         # http://localhost:8080
make test          # structure + link check
make test-offline  # structure only, no network
```

## License

BSD 2-Clause, see `LICENSE`.
