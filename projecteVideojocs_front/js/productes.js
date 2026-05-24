function carregarJocs(ordre) {
    var orderBy;
    if (ordre === 'rating-desc') orderBy = 'rating DESC';
    else if (ordre === 'rating-asc') orderBy = 'rating ASC';
    else if (ordre === 'title-asc') orderBy = 'title ASC';
    else if (ordre === 'title-desc') orderBy = 'title DESC';
    else if (ordre === 'price-desc') orderBy = 'price DESC';
    else if (ordre === 'price-asc') orderBy = 'price ASC';
    else orderBy = 'rating DESC';

    var sql = 'SELECT * FROM game ORDER BY ' + orderBy;

    consultar(sql).then(function(jocs) {
        var container = document.getElementById('games');
        container.innerHTML = '';

        for (var i = 0; i < jocs.length; i++) {
            var joc = jocs[i];
            var card = document.createElement('div');
            card.classList.add('card');

            var img = document.createElement('img');
            img.src = joc.image_url;
            img.alt = joc.title;

            var titol = document.createElement('h2');
            titol.textContent = joc.title;

            var desc = document.createElement('p');
            desc.textContent = joc.description;

            var preu = document.createElement('p');
            preu.classList.add('preu');
            preu.textContent = joc.price + '€';

            card.appendChild(img);
            card.appendChild(titol);
            card.appendChild(desc);
            card.appendChild(preu);
            container.appendChild(card);
        }
    });
}

// Ordenació
document.getElementById('ordenar').addEventListener('change', function() {
    carregarJocs(this.value);
});

// Toggle vista
document.getElementById('btn-graella').addEventListener('click', function() {
    document.getElementById('games').className = 'vista-graella';
    document.getElementById('btn-graella').classList.add('active');
    document.getElementById('btn-llistat').classList.remove('active');
});

document.getElementById('btn-llistat').addEventListener('click', function() {
    document.getElementById('games').className = 'vista-llistat';
    document.getElementById('btn-llistat').classList.add('active');
    document.getElementById('btn-graella').classList.remove('active');
});

// Càrrega inicial
carregarJocs('rating-desc');