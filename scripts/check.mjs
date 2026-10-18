#!/usr/bin/env node
// Checks the games list: every entry has the fields the page needs, every
// thumbnail exists, and every Play / Source URL answers 2xx.
//
//   node scripts/check.mjs            # structure + links
//   node scripts/check.mjs --no-links # structure only (offline)
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const checkLinks = !process.argv.includes("--no-links");

const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(root, "games.js"), "utf8"), sandbox);
const games = sandbox.window.GAMES;

const required = ["id", "name", "description", "play", "source", "thumb"];
const problems = [];

if (!Array.isArray(games) || games.length === 0) {
  problems.push("games.js: GAMES is missing or empty");
} else {
  const seen = new Set();
  for (const game of games) {
    const label = game.id || "(no id)";
    for (const field of required) {
      if (!game[field]) problems.push(label + ": missing " + field);
    }
    if (game.id && seen.has(game.id)) problems.push(label + ": duplicate id");
    seen.add(game.id);
    if (game.thumb && !existsSync(join(root, game.thumb))) {
      problems.push(label + ": thumbnail " + game.thumb + " does not exist");
    }
    for (const field of ["play", "source"]) {
      if (game[field] && !/^https:\/\//.test(game[field])) {
        problems.push(label + ": " + field + " must be an https URL");
      }
    }
  }
}

if (problems.length === 0) {
  console.log("structure ok — " + games.length + " games");
}

if (checkLinks && problems.length === 0) {
  const urls = [...new Set(games.flatMap((game) => [game.play, game.source]))];
  for (const url of urls) {
    let response;
    try {
      response = await fetch(url, { redirect: "follow" });
    } catch (error) {
      problems.push(url + ": " + error.message);
      continue;
    }
    if (!response.ok) problems.push(url + ": HTTP " + response.status);
    else console.log("ok " + response.status + " " + url);
  }
}

if (problems.length > 0) {
  for (const problem of problems) console.error("error: " + problem);
  process.exit(1);
}
console.log("all checks passed");
