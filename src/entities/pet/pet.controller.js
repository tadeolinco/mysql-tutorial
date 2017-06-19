import db from '../../database/db';
// We import the db to get the connection that we need.

// done is the callback that you passed from the router
export const getAll = done => {
    // The first parameter is the query
    // The last parameter is another callback function
    db.query('SELECT * FROM pet', (err, rows) => {
        // Remember that what done is in the form of (error, pets)
        if (err) return done(err);
        done(null, rows);
    });
};

// Another example here is when we pass an id
export const getOne = (pet_id, done) => {
    // Question marks in the query denote a variable that's going to be passed
    // in the second parameter. These are passed in order.
    // You can also pass arrays like in the other examples.
    db.query('SELECT * FROM pet WHERE pet_id = ?', pet_id, (err, rows) => {
        if (err) return done(err);
        if (!rows.length) return done(null, null);
        done(null, rows[0]);
    });
};

export const getOwners = (pet_id, done) => {
    db.query(
        'SELECT * FROM user NATURAL JOIN user_owns_pet WHERE pet_id = ?',
        pet_id,
        (err, rows) => {
            if (err) return done(err);
            done(null, rows);
        }
    );
};

export const create = values => {
    const { kind, name } = values;
    db.query(
        'INSERT INTO pet VALUES (0, ?, ?)',
        [kind, name],
        (err, results) => {
            if (err) return done(err);
            const body = {
                ...values,
                pet_id: results.insertId
            };
            done(null, body);
        }
    );
};

export const update = (id, values, done) => {
    db.query(
        'UPDATE pet SET ? WHERE pet_id = ?',
        [values, id],
        (err, results) => {
            if (err) return done(err);
            values.pet_id = id;
            return done(null, values);
        }
    );
};

export const remove = (id, done) => {
    db.query('DELETE FROM pet WHERE pet_id = ?', id, (err, results) => {
        if (err) done(err);
        done(null);
    });
};
