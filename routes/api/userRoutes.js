const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');

// /api/users
router.route('/')
  .get(getAllUser)
  .post(createUser);

// /api/users/:id
router.route('/id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/user/  ???
router.route('/')
  .get(  path  )
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;