function loadGames(order) {
    let orderBy;
    switch (order) {
    case "rating-desc":
        orderBy = "rating DESC";
        break;
    case "rating-asc":
        orderBy = "rating ASC";
        break;
    case "title-asc":
        orderBy = "title ASC";
        break;
    case "title-desc":
        orderBy = "title DESC";
        break;
    case "price-desc":
        orderBy = "price DESC";
        break;
    case "price-asc":
        orderBy = "price ASC";
        break;
    default:
        orderBy = "rating DESC";
    }
    const sql = "SELECT * FROM game ORDER BY " + orderBy;
    consultar(sql).then(function(games) {
        const container = document.getElementById("games");
        container.innerHTML = "";
        for (let i = 0; i < games.length; i++) {
            const game = games[i];
            const card = document.createElement("div");
            card.classList.add("card");
            const img = document.createElement("img");
            img.src = game.image_url;
            img.alt = game.title;
            const title = document.createElement("h2");
            title.textContent = game.title;
            const desc = document.createElement("p");
            desc.textContent = game.description;
            const price = document.createElement("p");
            price.classList.add("price");
            price.textContent = game.price + "€";
            const buyBtn = document.createElement("button");
            buyBtn.textContent = "Comprar";
            buyBtn.classList.add("btn-buy");
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(desc);
            card.appendChild(price);
            card.appendChild(buyBtn);
            container.appendChild(card);
        }
    });
}

document.getElementById("sort").addEventListener("change", function() {
    loadGames(this.value);
});

document.getElementById("btn-grid").addEventListener("click", function() {
    document.getElementById("games").className = "grid-view";
    document.getElementById("btn-grid").classList.add("active");
    document.getElementById("btn-list").classList.remove("active");
});

document.getElementById("btn-list").addEventListener("click", function() {
    document.getElementById("games").className = "list-view";
    document.getElementById("btn-list").classList.add("active");
    document.getElementById("btn-grid").classList.remove("active");
});

loadGames("rating-desc");