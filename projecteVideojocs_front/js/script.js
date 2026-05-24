const recentGamesContainer = document.querySelector("#recent-games");
const recentGames = document.querySelectorAll("#recent-games > div");

const popularGamesContainer = document.querySelector("#popular-games");
const popularGames = document.querySelectorAll("#popular-games > div");

const sql = "SELECT * FROM game INNER JOIN game_creator ON game.id = game_creator.game_id ORDER BY game_creator.publish_date LIMIT 3;";

consultar(sql).then(games => {
    for(let i = 0; i < games.length; i++){
        const btnBuy = document.createElement("button");
        btnBuy.textContent = "Comprar";
        btnBuy.classList.add("btn-buy")
        recentGames[i].innerHTML = `<h2>${games[i].title}</h2>`;
        const price = document.createElement("p");
        price.textContent = `Preu: ${games[i].price}€`;
        const rating = document.createElement("p");
        rating.textContent = `Valoració: ${games[i].rating}★`;
        const cover = document.createElement("img");
        cover.src = games[i].image_url;
        console.log(games[i].image_url)
        recentGames[i].appendChild(cover);
        recentGames[i].appendChild(rating);
        recentGames[i].appendChild(price);
        recentGames[i].appendChild(btnBuy);
    }
    
});

const sql1 = "SELECT * FROM game ORDER BY game.rating DESC LIMIT 3;";

consultar(sql1).then(games => {
    for(let i = 0; i < games.length; i++){
        const cover = document.createElement("img");
        cover.src = games[i].image_url;
        console.log(games[i].image_url)
        const btnBuy = document.createElement("button");
        btnBuy.textContent = "Comprar";
        btnBuy.classList.add("btn-buy")
        popularGames[i].innerHTML = `<h2>${games[i].title}</h2>`;
        const price = document.createElement("p");
        price.textContent = `Preu: ${games[i].price}€`;
        const rating = document.createElement("p");
        rating.textContent = `Valoració: ${games[i].rating}★`;
        popularGames[i].appendChild(cover);
        popularGames[i].appendChild(rating);
        popularGames[i].appendChild(price);
        popularGames[i].appendChild(btnBuy);
    }
    
});

