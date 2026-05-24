DROP TABLE IF EXISTS game_creator;
DROP TABLE IF EXISTS game_genre;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS creator;
DROP TABLE IF EXISTS genre;

CREATE TABLE game(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(300) NOT NULL,
    `description` TEXT,
    price DECIMAL(15, 2) NOT NULL,
    stock INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    image_url TEXT
);

CREATE TABLE creator(
    id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    last_name VARCHAR(150),
    birth_date DATE,
    country VARCHAR(200),
    image_url TEXT
);

CREATE TABLE genre(
    id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT
);

CREATE TABLE game_genre(
    game_id INT,
    genre_id INT,

    PRIMARY KEY (game_id, genre_id),

    CONSTRAINT fk_game FOREIGN KEY (game_id) REFERENCES game(id),
    CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genre(id)
);

CREATE TABLE game_creator(
    game_id INT,
    creator_id INT,
    publish_date DATE NOT NULL,

    PRIMARY KEY (game_id, creator_id),

    CONSTRAINT fk_gc_game FOREIGN KEY (game_id) REFERENCES game(id),
    CONSTRAINT fk_gc_creator FOREIGN KEY (creator_id) REFERENCES creator(id)
);