const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUser).post(createUser);

// /api/users/:userId GET user PUT user DELETE user
router.route('/:userId').get(getSingleUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;