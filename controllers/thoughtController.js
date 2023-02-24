const { User, Thought } = require('../models');

module.exports = {
    // Get all Thoughts
    getThoughts(req, res) {
        Thought.find() 
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // GET to get a single thought by its _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No thought with that ID'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id } ) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId},
                { $push: { thought: _id } },
                { new: true},
            );

        }).then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No Users with that ID'})
            : res.json(thought)
        ) 
        .catch((err) => res.status(500).json(err));
    },
    // Update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $set: req.body},
            { runValidators: true, new: true }
        )
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No thought with this Id'})
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.userId}) 
            .then((thought) => 
                !thought
                ? res.status(404).json({ message: 'No thought with that ID'})
                : User.findOneAndUpdate(
                    { thought: req.params.thoughtId},
                    { $pull: { thought: {friendsId: req.params.thoughtId } } },
                    { new: true },
                )
            )
            .then((users) => 
                !users
                 ? res.status(404).json({ message: 'Thought has been deleted, no user!'})
                 : res.json({ message: 'Though has been deleted'})
                    
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create Reaction
    createReaction(req, res) {
        console.log('You are creating a new reaction!');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id:req.params.thoughtId },
            { $addtoSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No friend found with that ID'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: { reactions: {reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No reaction found with that ID'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

};