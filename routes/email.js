var express = require('express');
var router = express.Router();
const EmailController = require("../controllers/Email");

router.post("/send-contact-us", (req, res) => { 
    console.log(req.body)
    EmailController.sendContactUsEmail(req, res)
});
module.exports = router;
