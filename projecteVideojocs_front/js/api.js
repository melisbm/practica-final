function consultar(sql) {
    const url = "http://localhost:3000/daw/" + encodeURIComponent(sql);
    return fetch(url)
        .then(function(response) { return response.json(); })
        .then(function(data) { return data.data; });
}