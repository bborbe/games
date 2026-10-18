(function () {
  "use strict";

  const list = document.getElementById("games");
  if (!list || !Array.isArray(window.GAMES)) return;

  const fragment = document.createDocumentFragment();

  for (const game of window.GAMES) {
    const item = document.createElement("li");
    item.className = "card";

    const thumbLink = document.createElement("a");
    thumbLink.className = "card-thumb";
    thumbLink.href = game.play;
    thumbLink.setAttribute("aria-label", "Play " + game.name);

    const img = document.createElement("img");
    img.src = game.thumb;
    img.alt = game.name + " screenshot";
    img.width = 640;
    img.height = 360;
    img.loading = "lazy";
    thumbLink.append(img);

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h2");
    title.className = "card-title";
    title.textContent = game.name;

    const description = document.createElement("p");
    description.className = "card-desc";
    description.textContent = game.description;

    const actions = document.createElement("p");
    actions.className = "card-actions";

    const playLink = document.createElement("a");
    playLink.className = "button button-primary";
    playLink.href = game.play;
    playLink.textContent = "Play";

    const sourceLink = document.createElement("a");
    sourceLink.className = "button";
    sourceLink.href = game.source;
    sourceLink.textContent = "Source";

    actions.append(playLink, sourceLink);
    body.append(title, description, actions);
    item.append(thumbLink, body);
    fragment.append(item);
  }

  list.append(fragment);
})();
