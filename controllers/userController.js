const { User, Thought } = require('../models');

module.exports = {
    // Get all Users
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // GET a single user by its _id and populated thought and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'No friend with that ID'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // POST a new user:
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    // PUT to update a user by its _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $set: req.body},
            { runValidators: true, new: true }
        )
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No User with this Id'})
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add friend
    addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id:req.params.userId },
            { $addtoSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No friend found with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: { friends: {friendsId: req.params.friendsId } } },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                 ? res
                    .status(404)
                    .json({ message: 'No friend found with that ID'})
                    : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

};