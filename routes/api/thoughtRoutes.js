const router = require('express').Router();

const {
  get,
  get,
  create,
  update,
  delete,
} = require('../../controllers/courseController.js');

// /api/courses
router.route('/').get(get).post(createCourse);

// /api/courses/:courseId
router
  .route('/:Id')
  .get(get)
  .put(update)
  .delete(delete);

module.exports = router;