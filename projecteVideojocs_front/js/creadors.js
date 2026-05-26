function loadCreators(order) {
    let orderBy;
    switch (order) {
    case "name-asc":
        orderBy = "name ASC";
        break;
    case "name-desc":
        orderBy = "name DESC";
        break;
    case "games-asc":
        orderBy = "COUNT(game_creator.game_id) ASC";
        break;
    case "games-desc":
        orderBy = "COUNT(game_creator.game_id) DESC";
        break;
    default:
        orderBy = "name ASC";
    }

    const sql = `
        SELECT creator.*, COUNT(game_creator.game_id) AS game_count
        FROM creator
        LEFT JOIN game_creator ON creator.id = game_creator.creator_id
        GROUP BY creator.id
        ORDER BY ${orderBy}
    `;
    consultar(sql).then(function(creators) {
        const container = document.getElementById("creators");
        container.innerHTML = "";
        for (let i = 0; i < creators.length; i++) {
            const creator = creators[i];
            const card = document.createElement("div");
            card.classList.add("card");
            const img = document.createElement("img");
            const a = document.createElement("a");
            img.src = creator.image_url;
            a.href = `productes.html?creador=${creator.id}`;
            img.alt = creator.name;
            const creatorName = document.createElement("h2");
            const creatorCountry = document.createElement("h3");
            const gameCount = document.createElement("h3");
            creatorName.textContent = creator.name;
            creatorCountry.textContent = creator.country;
            gameCount.textContent = creator.game_count + " games published";
            a.appendChild(img);
            card.appendChild(a);
            card.appendChild(creatorName);
            card.appendChild(gameCount);
            card.appendChild(creatorCountry);
            container.appendChild(card);
        }
    });
}

document.getElementById("sort").addEventListener("change", function() {
    loadCreators(this.value);
});

loadCreators("name-asc");