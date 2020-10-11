const express = require('express');
const router = express.Router();
const emailValidator = require('deep-email-validator');

async function isEmailValid(email) {
  return emailValidator.validate(email, {})
}

router.post('/register', async function(req, res) {
  const {email, password} = req.body;

  if (!email || !password){
    return res.status(400).send({
      message: "Email or password missing."
    })
  }

  const {valid, reason, validators} = await isEmailValid(email);

  if (valid) return res.send({message: "OK"});

  return res.status(400).send({
    message: "Please provide a valid email address.",
    reason: validators[reason].reason
  })

});

module.exports = router;
