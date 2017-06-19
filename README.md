# mysql-tutorial

# MySQL
## Installing MySQL in Linux
Open up your terminal and run 

    sudo apt-get install mysql-server
    
During installation, the setup will ask you for a password for the root account. For consistency, let's just use `admin` for the password.

## Using MySQL
Open up your terminal and run 

    mysql -u root -p

The `-u` flag is set to indicate which user is logging in

The `-p` flag is set to indicate that the user will use a password
Enter the password, in this case `admin`. Then you should see something like the one below.

    Welcome to the MySQL monitor.  Commands end with ; or \g.
    Your MySQL connection id is 4
    Server version: 5.7.18-0ubuntu0.16.04.1 (Ubuntu)

    Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.

    Oracle is a registered trademark of Oracle Corporation and/or its
    affiliates. Other names may be trademarks of their respective
    owners.

    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

    mysql> 

## Databases
Try running the command `SHOW DATABASES` in the prompt. It should show something like this.
    
    +--------------------+
    | Database           |
    +--------------------+
    | information_schema |
    | mysql              |
    | performance_schema |
    | sys                |
    +--------------------+
    4 rows in set (0.01 sec)

    mysql> 
    
A **database** is essentially just a collection of **tables**. We'll get to that later. We won't touch the ones currently in MySQL. For now let's try making a database of our own. Enter the following commands:

    
    CREATE DATABASE sample;
    USE sample
    
If it's not obvious yet, `CREATE DATABASE` are the keywords to create a database, in this case, named `sample`.

The keyword `USE` lets MySQL know which database we want to use with our consequent commands.

Note that semi-colon is important. 

Also note, the commands are case-insensitive. It's just a convention to type them in uppercase for them to stand out more. Here's a [discussion](https://stackoverflow.com/questions/608196/why-should-i-capitalize-my-sql-keywords) about the exact topic.

If you run the `SHOW DATABASES` command again, you can see that your database in now registered!

If you want to test it out, you can delete the database using the command below. Make sure to create and use it again if you do.  
        
    DROP DATABASE sample;

## Tables        

A **table** in turn is just a collection of like **rows** and that conform the to the table's **columns**. It's okay if you don't understand it yet. We'll get to it later. For now, let's create a table with this schema, or blueprint, using this command.

    
    CREATE TABLE user (
        user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    );
    SHOW TABLES;
    
In English this is saying:
    
    Let's create a table called user (CREATE TABLE user).
    It has columns called user_id and name. 
    
    All user_ids of each row should be an integer (INT),
    they should always have a value (NOT NULL),
    it will automatically increment if given no value (AUTO_INCREMENT),
    and will be the unique identifier for the row (PRIMARY KEY).

    All names of each row will be a string 
    with a variable length up to 50 characters (VARCHAR(50)),
    it should also have a value (NOT NULL).
    
Here we are laying out the blueprint that every row in the table should follow.
Try the command `DESC user`.
Note, we can type commands multiline, meaning you can enter anywhere in between keywords. MySQL will only accept the command after a semi-colon.

Now that we have table, let's try filling it in. Run the following:

    
    INSERT INTO user(user_id, name) VALUES (0, 'Lina');
    INSERT INTO user(name) VALUES ('Rylai');
    INSERT INTO user VALUES (0, 'Meepo');

Syntax is as follows: `INSERT INTO <table> [columns] VALUES ([values]);`

Here we have three different versions into a table.

The 1st one specifies all the table columns to correspond with the `VALUES`.

The 2nd one specifies only the `name` both in the column and in the `VALUES`. This is okay since `user_id` will `AUTO_INCREMENT` anyway.

You can also use the format in the 3rd one if you will be specifying `VALUES` for each column anyway.

Run the following one by one.

    
SELECT user_id FROM user;
SELECT name FROM user;
SELECT * FROM user;
SELECT * FROM user WHERE user_id = 1;
SELECT * FROM user WHERE name = 'meepo';
SELECT * FROM user ORDER BY name DESC;
SELECT * FROM user WHERE name LIKE '%a%';
    
Syntax is as follows: `SELECT <columns> FROM <table> [constraints];`
You can specify columns or use the wildcard to control what you get.
There are a lot more commands that you can use other than `WHERE` and `ORDER BY`, but I'll leave that to you.
Note, `%` is a wildcard, it can by anything or nothing.

To edit an existing row in the table, you could use this:

    
    UPDATE user SET name = 'pudge' WHERE user_id = 1 OR name = 'Lina';
    
Syntax is as follows: `UPDATE <table> SET [<column> = <value>] [WHERE [<column> = <value>]]`

Updates a table, changing all rows with what `SET` indicates.

To delete existing rows, you could use these:

    
    DELETE FROM user WHERE user_id = 1;
    DELETE FROM user WHERE user_id = 'pudge';
    DELETE FROM user;
    

Let's make things a bit more complicated. Let's say we want each user to be able to own any number of pets. Let's make another table!

    
    CREATE TABLE pet (
        pet_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        kind ENUM('DOG', 'CAT', 'BIRD') NOT NULL,
        name VARCHAR(50) NOT NULL,
        user_id INT DEFAULT NULL,
        CONSTRAINT pet_user_id_user_fk FOREIGN KEY(user_id)
        REFERENCES user(user_id) ON DELETE SET NULL
    );
    
In English:
    
    Let's create a table called pet.
    It has three columns namely pet_id, kind, and user_id.

    pet_id is your usual primary key int identifier, the same as the one in user.

    name is your usual required string.

    kind's value can only be one of the three choices, 'DOG, 'CAT' and 'BIRD'.

    user_id is a foreign key or FK. Think of it as a pointer (like in C) to a 
    primary key, or PK, of another table, in this case, user. 
    INSERTing INTO the pet table with a foreign key that doesn't exist in user will fail.
    Deleting the user that already has pets, 
    will automatically set the FK to null (ON DELETE SET NULL).

    We make this user_id a foreign key using the CONSTRAINT.
    The syntax goes - CONSTRAINT <name of constraint> FOREIGN KEY(<FK>)
    REFERENCES <table>(<corresponding PK to FK>) [OPTIONS].
    

If you deleted or updated any of the previous users, recreate them again. Then we'll try giving Lina three dogs and Rylai three birds.

    
    INSERT INTO pet VALUES (0, 'DOG', 'Raiku', 1);
    INSERT INTO pet VALUES (0, 'DOG', 'Entei', 1);
    INSERT INTO pet VALUES (0, 'DOG', 'Suicune', 1);

    INSERT INTO pet VALUES (0, 'BIRD', 'Articuno', 2);
    INSERT INTO pet VALUES (0, 'BIRD', 'Zapdos', 2);
    INSERT INTO pet VALUES (0, 'BIRD', 'Moltres', 2);
    
New ways of getting data that can occur come to mind, such as getting all pets of Lina for example.
    
    
    SELECT * FROM pet WHERE user_id = 1;
    

Notice that these two tables have a 1 to N relationship. One user can have N pets. This will be very important in shaping the schema of your database.

What if we changed it into a user can have many pets but a pet can also have many users? The previous schema of the pet table won't work as it would have to have a dynamic number of foreign keys. The same goes for the user table. To remedy these kinds of problems, we have to make a table soley just to keep the FKs. The final tables that we'll have are the following:
    
    
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
    
Notice that we removed the user_id from the pet table.

user_id and pet_id from the user_owns_pet table are both FKs to their corresponding PKs. user_owns_pet's PK will be the combination of both FKs, meaning this combination is required to be unique.


    
    +---------+-------+
    | user_id | name  |
    +---------+-------+
    |       1 | Lina  |
    |       2 | Rylai |
    |       3 | Meepo |
    +---------+-------+

    +--------+------+----------+
    | pet_id | kind | name     |
    +--------+------+----------+
    |      1 | DOG  | Raiku    |
    |      2 | DOG  | Entei    |
    |      3 | DOG  | Suicune  |
    |      4 | BIRD | Articuno |
    |      5 | BIRD | Zapdos   |
    |      6 | BIRD | Moltres  |
    +--------+------+----------+

    +---------+--------+
    | user_id | pet_id |
    +---------+--------+
    |       1 |      1 |
    |       2 |      1 |
    |       1 |      2 |
    |       2 |      2 |
    |       2 |      3 |
    +---------+--------+
    

Given these tables, we know that both Lina and Rylai own both Raiku and Entei, but Rylai owns Suicune too. 

To select all pets of Rylai, for example, we'd use this query:
```
SELECT * FROM pet JOIN user_owns_id WHERE user_id = 2;
```
This query is wrong, intentionally. Instead it shows all combinations of `pet` to `user_owns_pet`. But you can notice that it has two `pet_id`s in its column. Instead of the query above, we'll use:
```
SELECT * FROM pet NATURAL JOIN user_owns_id WHERE user_id = 2;
```
What `NATURAL JOIN` does is that it only takes the rows that have two exactly the same column and value. In this case, the `pet_id`.

Notice that the relationship of user and pet is N to M, meaning a user can have many pets and a pet can have many owners. Remember that in these cases, it's better to make another table just for the FKs, as compared to the 1 to N relationships.

# The Demo
## Installing the demo
Open up your terminal and run:

    git clone https://github.com/tadeolinco/mysql-tutorial
    cd mysql-tutorial
    npm install

## Initializing apidocs

    npm run apidoc

## Starting the demo

    npm start

Go to your favorite browser and go to localhost:3001 to see the api docs
## Project Structure
    .
    ├── node_modules
    ├── src
    │   ├── database
    │   │   ├── database.sql            # database schema and seed data
    │   │   └── db.js                   # connection to database
    │   ├── entities
    │   │   ├── user                    
    │   │   │   ├── user.controller.js
    │   │   │   └── user.router.js
    │   │   └── pet
    │   │       ├── pet.controller.js
    │   │       └── pet.router.js
    │   ├── router.js                   # main router file 
    │   └── server.js                   # main server file
    ├── .gitignore          
    ├── .babelrc                        # babel config, let's you use ES6
    ├── package-lock.json
    ├── package.json                    
    └── README.md                       # you're reading this

Start reading the documentation from src/server.js.
