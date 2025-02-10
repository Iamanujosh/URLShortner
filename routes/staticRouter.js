//used for rendering static files
const express = require("express");
const URL = require("../models/url");
const { checkForAuthantication,restrictToRoles } = require("../middlewares/auth");

const router = express.Router();

router.get("/signup",async(req,res) => {
    return res.render("signup")
})
router.get("/login",async(req,res) => {
    return res.render("login")
})
router.get("/",restrictToRoles(["user"]), async(req,res) => {
    
    const allUrls = await URL.find({createdBy: req.user._id});
   
    return res.render("home",
        {urls:allUrls},
    );
})

module.exports = router;