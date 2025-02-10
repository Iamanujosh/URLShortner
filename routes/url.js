const express = require("express");
const {handleStoreUrl,handleRedirectUrl} = require("../controllers/url");
const router = express.Router();


router.post("/",handleStoreUrl);
router.get("/:shortId",handleRedirectUrl);

module.exports = router;