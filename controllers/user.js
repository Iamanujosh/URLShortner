const USER = require("../models/user");
const {setUser} = require("../services/auth")

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

   return res.redirect("/");
} 

async function handleLogin(req,res){
    const {email,password} = req.body;
    const userLogin = await USER.findOne({email, password})

    if(!userLogin){return res.render("login",{msg:"Invali Credential"})}
    
    const token = setUser(userLogin);
    res.cookie("token",token);
    return res.redirect("/");
    //return res.json({ token });
}
module.exports = {
    handleSignup,
    handleLogin,
}