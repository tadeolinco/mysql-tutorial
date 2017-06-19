import db from '../../database/db';

export const getAll = done => {
  db.query('SELECT * FROM user', (err, rows) => {
    if (err) return done(err);
    done(null, rows);
  });
};

export const getOne = (user_id, done) => {
  db.query('SELECT * FROM user WHERE user_id = ?', user_id, (err, rows) => {
    if (err) return done(err);
    if (!rows.length) return done(null, null);
    done(null, rows[0]);
  });
};

export const getPets = (user_id, done) => {
  db.query(
    'SELECT * FROM pet NATURAL JOIN user_owns_pet WHERE user_id = ?',
    user_id,
    (err, rows) => {
      if (err) return done(err);
      done(null, rows);
    }
  );
};

export const create = values => {
  const { name, kind, user_id } = values;
  db.query(
    'INSERT INTO user VALUES (0, ?, ?, ?)',
    [name, kind, user_id],
    (err, results) => {
      if (err) return done(err);
      const body = {
        ...values,
        user_id: results.insertId
      };
      done(null, body);
    }
  );
};

export const assignPet = (user_id, pet_id, done) => {
  db.query(
    'INSERT INTO user_owns_pet VALUES (?, ?)',
    [user_id, pet_id],
    (err, results) => {
      if (err) return done(err);
      const body = { user_id, pet_id };
      done(null, body);
    }
  );
};

export const update = (id, values, done) => {
  db.query(
    'UPDATE user SET ? WHERE user_id = ?',
    [values, id],
    (err, results) => {
      if (err) return done(err);
      values.user_id = id;
      return done(null, values);
    }
  );
};

export const remove = (id, done) => {
  db.query('DELETE FROM user WHERE user_id = ?', id, (err, results) => {
    if (err) done(err);
    done(null);
  });
};

export const disownPet = (user_id, pet_id, done) => {
  db.query(
    'DELETE FROM user_owns_pet WHERE user_id = ? AND pet_id = ?',
    [user_id, pet_id],
    (err, results) => {
      if (err) return done(err);
      done(null);
    }
  );
};
