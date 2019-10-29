const express = require("express");
const {
  redirectShortenUrl,
  downloadShortenUrl
} = require("../controller/shortUrl");
const {
  findShortenUrl
} = require("../middleware/findShortenUrl");
const router = express.Router();

const sendEmail = require("../middleware/sendEmail").sendEmail;
const saveEmail = require('../middleware/saveEmail').saveEmail;
const sendEmailValidator = require('../middleware/validator/emailMsgValidator').validateEmail;
const loginUser = require("../controller/login");
const registerUser = require("../controller/register");
const uploadFile = require("../controller/upload");
const multer = require("../middleware/multer");
const shortenLink = require("../controller/shortUrl");
const validateCookie = require('../middleware/validator/validateCookie')
const guestPage = require('../middleware/guestPage')

router.get("/:shortenId", findShortenUrl, (req, res) => {
  const fullLink = req.protocol + "://" + req.get("host");
  const shortenId = req.params.shortenId;
  res.render("download", {
    shortenId: shortenId,
    fullLink: fullLink
  });
});
//router.get('/:shortenId', findShortenUrl, redirectShortenUrl);
// router.get("/api/auth/upload", validateCookie, guestPage);
router.post("/api/auth/login", loginUser);
router.post("/api/auth/register", registerUser);
router.post('/api/auth/sendEmail', sendEmailValidator, saveEmail, sendEmail);
router.post("/:shortenId", findShortenUrl, downloadShortenUrl);
router.post("/api/auth/upload", multer, uploadFile, shortenLink.shortenUrl);
module.exports = router;