const USER = require("../models/user");

async function handleSignup(req,res){
   const {userName,email,password} = req.body;
   if(!userName & !email & !password){
    return res.render(
        "signup",
        {msg:"All Fields Are Required!!"})
   }

   await USER.create({
    userName,
    email,
    password,
   })

   return res.render("home");
} 

module.exports = {
    handleSignup,
}