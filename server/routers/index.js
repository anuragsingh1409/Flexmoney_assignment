const express = require('express');
const router = express.Router();

const { signUpUser, signInUser, batchUpdated, paymentCompleted } = require('../controllers/user');

router.post('/signUp', signUpUser);
router.post('/signIn', signInUser);
router.patch('/batchChange/:_id', batchUpdated);
router.patch('/paymentCompleted/:_id', paymentCompleted);

module.exports = router;