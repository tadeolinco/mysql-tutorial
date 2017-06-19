import { Router } from 'express';
import * as Ctrl from './pet.controller';

// We create another mini-router only for the pets
const router = Router();

// These multi-line comments are what generates the apidocs
// that we can see in localhost:3001
/**
 * @api {get} /api/pets 1. Get all Pets
 * @apiName GetAllPets
 * @apiGroup Pet
 *
 * @apiSuccess {Object[]} pets List of pets
 * @apiSuccess {Number} pets.pet_id Unique ID of pet.
 * @apiSuccess {String} pets.kind Enum either of "DOG", "CAT", "BIRD".
 * @apiSuccess {String} pets.name Name of pet.
 */

// Here we are saying that when the client
// requests for the route `/api/users` we do the below
router.get('/', (req, res) => {
  // You may ask what Ctrl, or controller, is.
  // Think of Ctrl as a set of generic functions that you can use
  // for the routes. These are where the database manipulations really
  // take place. The router shouldn't care how exactly the controller
  // manages this. It just needs to pass in the correct parameters.
  // This leaves us flexible in changing what database we are using.

  // In this case, getAll() accepts one parameter, which is a callback.
  // Since databases queries are asynchronous, the callback function
  // is called once the the queries is done. Normally the patterns
  // for these callbacks are (error, results)
  Ctrl.getAll((err, pets) => {
    // this is fired once the query done by the controller is done
    if (err) return res.status(500).json(err);
    res.json(pets);
  });
});

// Move on to src/entities/pet/pet.controller.js

/**
 * @api {get} /api/pets/:pet_id 2. Get one Pet
 * @apiName GetOnePet
 * @apiGroup Pet
 *
 * @apiParam {Number} pet_id Pet's unique ID.
 * 
 * @apiSuccess {Number} pet_id Unique ID of pet.
 * @apiSuccess {String} kind Enum either of "DOG", "CAT", "BIRD".
 * @apiSuccess {String} name Name of pet.
 */
router.get('/:pet_id', (req, res) => {
  const id = +req.params.pet_id;
  Ctrl.getOne(id, (err, pet) => {
    if (err) return res.status(500).json(err);
    if (!err && !pet) return res.status(404).json(pet);
    res.json(adtype);
  });
});

/**
 * @api {get} /api/pets/:pet_id/owners 3. Get all Owners of the Pet
 * @apiName GetAllOwnersOfPet
 * @apiGroup Pet
 *
 * @apiParam {Number} pet_id Pet's unique ID.
 * 
 * @apiSuccess {Object[]} users   List of users.
 * @apiSuccess {Number} users.user_id   Id of user.
 * @apiSuccess {String} users.name      Name of user
 * @apiSuccess {Number} users.pet_id    Id of pet.
 */
router.get('/:pet_id/owners', (req, res) => {
  const id = +req.params.pet_id;
  Ctrl.getOwners(id, (err, owners) => {
    if (err) return res.status(500).json(err);
    res.json(owners);
  });
});

/**
 * @api {post} /api/pets 4. Create a Pet
 * @apiName CreatePet
 * @apiGroup Pet
 *
 * @apiParam {String} kind Required enum of either "DOG", "CAT", "BIRD"
 * @apiParam {String} name Required name of pet.
 * 
 * @apiSuccess {Number} pet_id Unique ID of Pet.
 * @apiSuccess {String} kind Enum either of "DOG", "CAT", "BIRD".
 * @apiSuccess {String} name Name of pet.
 */
router.post('/', (req, res) => {
  Ctrl.create(req.body, (err, pet) => {
    if (err) return res.status(500).json(err);
    res.json(pet);
  });
});

/**
 * @api {put} /api/pets/:pet_id 5. Create a Pet
 * @apiName UpdatePet
 * @apiGroup Pet
 * 
 * @apiParam {Number} pet_id Unique ID of Pet to be updated
 * @apiParam {String} kind Required enum of either "DOG", "CAT", "BIRD"
 * @apiParam {String} name Required name of pet.
 * 
 * @apiSuccess {Number} pet_id Unique ID of Pet.
 * @apiSuccess {String} kind Enum either of "DOG", "CAT", "BIRD".
 * @apiSuccess {String} name Name of pet.
 */
router.put('/:pet_id', (req, res) => {
  const id = +req.params.pet_id;
  Ctrl.update(id, req.body, (err, pet) => {
    if (err) return res.status(500).json(err);
    res.json(pet);
  });
});
/**
 * @api {delete} /api/pets/:pet_id 6. Delete a Pet
 * @apiName DeletePet
 * @apiGroup Pet
 * 
 * @apiParam {Number} pet_id Unique Id of Pet to be deleted.
 */
router.delete('/:pet_id', (req, res) => {
  const id = +req.params.pet_id;
  Ctrl.delete(id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (!err && !results) return res.status(404).json(err);
    res.json(null);
  });
});

export default router;
