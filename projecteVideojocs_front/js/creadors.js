function getOrderBy(order) {
    switch (order) {
        case "name-asc": return "creator.name ASC";
        case "name-desc": return "creator.name DESC";
        case "games-asc": return "game_count ASC";
        case "games-desc": return "game_count DESC";
        default: return "creator.name ASC";
    }
}

function loadCreators(order, genreId) {
    const orderBy = getOrderBy(order);

    let sql;
    if (genreId) {
        sql = `
            SELECT creator.*, COUNT(DISTINCT game_creator.game_id) AS game_count
            FROM creator
            INNER JOIN game_creator ON creator.id = game_creator.creator_id
            INNER JOIN game_genre ON game_creator.game_id = game_genre.game_id
            WHERE game_genre.genre_id = ${genreId}
            GROUP BY creator.id
            ORDER BY ${orderBy}
        `;
    } else {
        sql = `
            SELECT creator.*, COUNT(game_creator.game_id) AS game_count
            FROM creator
            LEFT JOIN game_creator ON creator.id = game_creator.creator_id
            GROUP BY creator.id
            ORDER BY ${orderBy}
        `;
    }

    consultar(sql).then(function(creators) {
        const container = document.getElementById("creators");
        container.innerHTML = "";
        for (let i = 0; i < creators.length; i++) {
            const creator = creators[i];
            const card = document.createElement("div");
            card.classList.add("card");
            const a = document.createElement("a");
            a.href = `productes.html?creador=${creator.id}`;
            const img = document.createElement("img");
            img.src = creator.image_url;
            img.alt = creator.name;
            const creatorName = document.createElement("h2");
            const creatorCountry = document.createElement("h3");
            const gameCount = document.createElement("h3");
            creatorName.textContent = creator.name;
            creatorCountry.textContent = creator.country;
            gameCount.textContent = creator.game_count + " jocs publicats";
            a.appendChild(img);
            card.appendChild(a);
            card.appendChild(creatorName);
            card.appendChild(gameCount);
            card.appendChild(creatorCountry);
            container.appendChild(card);
        }
    });
}

function loadGenres() {
    consultar("SELECT * FROM genre ORDER BY name ASC").then(function(genres) {
        const select = document.getElementById("filter-genre");
        for (let i = 0; i < genres.length; i++) {
            const option = document.createElement("option");
            option.value = genres[i].id;
            option.textContent = genres[i].name;
            select.appendChild(option);
        }
    });
}

document.getElementById("sort").addEventListener("change", function() {
    const genreId = document.getElementById("filter-genre").value;
    loadCreators(this.value, genreId);
});

document.getElementById("filter-genre").addEventListener("change", function() {
    const order = document.getElementById("sort").value;
    loadCreators(order, this.value);
});

loadGenres();
loadCreators("name-asc", "");