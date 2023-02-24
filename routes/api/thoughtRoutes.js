const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId GET Thought PUT Thought DELETE Thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/Thoughts/:ThoughtId/friends/:friendId
router.route('/:thoughtId/reactions/:reactionId').post(createReaction).delete(deleteReaction);

module.exports = router;