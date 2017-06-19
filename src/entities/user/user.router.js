import { Router } from 'express';
import * as Ctrl from './user.controller';

const router = Router();

/**
 * @api {get} /api/users 1. Get all Users
 * @apiName GetAllUsers
 * @apiGroup User
 *
 * @apiSuccess {Object[]} users   List of users.
 * @apiSuccess {Number} users.user_id   Id of user.
 * @apiSuccess {String} users.name      Name of user
 */
router.get('/', (req, res) => {
    Ctrl.getAll((err, users) => {
        if (err) return res.status(500).json(err);
        res.json(users);
    });
});

/**
 * @api {get} /api/users/:user_id 2. Get one User
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} user_id Users unique ID.
 *
 * @apiSuccess {Number} user_id   Id of user.
 * @apiSuccess {String} name      Name of user
 */
router.get('/:user_id', (req, res) => {
    const id = +req.params.user_id;
    Ctrl.getOne(id, (err, user) => {
        if (err) return res.status(500).json(err);
        if (!err && !user) return res.status(404).json(user);
        res.json(adtype);
    });
});

/**
 * @api {get} /api/users/:user_id/pets 3. Get pets of a User
 * @apiName GetUserPets
 * @apiGroup User
 *
 * @apiParam {Number} user_id Users unique ID.
 *
 * @apiSuccess {Object[]} pets List of pets
 * @apiSuccess {Number} pets.pet_id Unique ID of pet.
 * @apiSuccess {String} pets.kind Enum either of "DOG", "CAT", "BIRD".
 * @apiSuccess {String} pets.name Name of pet.
 * @apiSuccess {Number} pets.user_id Unique ID of user that owns the pet.
 */
router.get('/:user_id/pets', (req, res) => {
    const id = +req.params.user_id;
    Ctrl.getPets(id, (err, pets) => {
        if (err) return res.status(500).json(err);
        res.json(pets);
    });
});

/**
 * @api {post} /api/users 4. Create a User
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {String} name Mandatory name for the user.
 *
 * @apiSuccess {Number} user_id   Id of user.
 * @apiSuccess {String} name      Name of user
 */

router.post('/', (req, res) => {
    Ctrl.create(req.body, (err, user) => {
        if (err) return res.status(500).json(err);
        res.json(user);
    });
});

/**
 * @api {post} /api/users/:user_id/pets/:pet_id 5. Assign a Pet to a User
 * @apiName AssignPetToUser
 * @apiGroup User
 *
 * @apiParam {Number} user_id Unique ID of user to be the owner
 * @apiParam {Number} pet_id Unique ID of pet to be owned
 *
 * @apiSuccess {Number} user_id Unique ID of user to be the owner
 * @apiSuccess {Number} pet_id Unique ID of pet to be owned
 */

router.post('/:user_id/pets/:pet_id', (req, res) => {
    const user_id = +req.params.user_id;
    const pet_id = +req.params.pet_id;
    Ctrl.assignPet(user_id, pet_id, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

/**
 * @api {put} /api/users/:user_id 6. Update a User
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiParam {Number} user_id Unique Id of user to be updated.
 * @apiParam {String} name Name to be updated of the user.
 *
 * @apiSuccess {Number} user_id   Id of user.
 * @apiSuccess {String} name      Updated name of user
 */

router.put('/:user_id', (req, res) => {
    const id = +req.params.user_id;
    Ctrl.update(id, req.body, (err, user) => {
        if (err) return res.status(500).json(err);
        res.json(user);
    });
});

/**
 * @api {delete} /api/users/:user_id 7. Delete a User
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {Number} user_id Unique Id of user to be deleted.
 */

router.delete('/:user_id', (req, res) => {
    const id = +req.params.user_id;
    Ctrl.delete(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (!err && !results) return res.status(404).json(err);
        res.json(null);
    });
});

/**
 * @api {delete} /api/users/:user_id/pets/:pet_id 8. Disown a Pet from User
 * @apiName DisownPetFromUser
 * @apiGroup User
 *
 * @apiParam {Number} user_id Unique ID of user disowning
 * @apiParam {Number} pet_id Unique ID of pet to be disowned
 */

router.delete('/:user_id/pets/:pet_id', (req, res) => {
    const user_id = +req.params.user_id;
    const pet_id = +req.params.pet_id;
    Ctrl.disownPet(user_id, pet_id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (!err && !results) return res.status(404).json(err);
        res.json(null);
    });
});

export default router;
