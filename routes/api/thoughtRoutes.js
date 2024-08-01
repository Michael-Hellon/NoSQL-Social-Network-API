const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteReaction); 

// /api/thoughts/ ???
router.route('/')
  .get(  path  )
  .post(addReaction);

// /api/thoughts/ ???
router.route('/')
  .get(  path  )
  .post(deleteThought);



module.exports = router;