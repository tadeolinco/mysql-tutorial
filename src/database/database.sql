DROP DATABASE IF EXISTS sample;
CREATE DATABASE sample;
USE sample;

CREATE TABLE user (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE pet (
    pet_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    kind ENUM('DOG', 'CAT', 'BIRD') NOT NULL,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE user_owns_pet (
    user_id INT NOT NULL,
    pet_id INT NOT NULL,
    CONSTRAINT user_owns_pet_pk PRIMARY KEY(user_id, pet_id),
    CONSTRAINT user_user_id_pet_fk FOREIGN KEY(user_id)
    REFERENCES user(user_id) ON DELETE CASCADE,
    CONSTRAINT user_pet_id_pet_fk FOREIGN KEY(pet_id)
    REFERENCES pet(pet_id) ON DELETE CASCADE
);