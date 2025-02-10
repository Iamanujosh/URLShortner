const { getUser } = require("../services/auth");

function checkForAuthantication(req,res,next){
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if(!tokenCookie) return next();

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

function restrictToRoles(roles = []){
    return function(req,res,next){

        if(!req.user) return res.render("/login");

        if(!roles.includes(req.user.role)) return res.end("unAuthanrized");
        console.log(req.user.role)
        return next();
    }
}

// async function restrictToUserLogin(req, res, next) {
//     const authHeader = req.headers['authorization'];

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.redirect("/login");
//     }

//     const token = authHeader.split("Bearer ")[1];

//     try {
//         const user = await getUser(token);
//         if (!user) {
//             return res.redirect("/login");
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         console.error("Authentication error:", error);
//         return res.redirect("/login");
//     }
// }

// async function checkAuth(req, res, next) {
//     const authHeader = req.headers['authorization'];

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         req.user = null; // Ensure req.user is explicitly null if no auth
//         return next();
//     }

//     const token = authHeader.split("Bearer ")[1];

//     try {
//         const user = await getUser(token);
//         req.user = user || null; // Set user if valid, otherwise null
//     } catch (error) {
//         console.error("Auth check error:", error);
//         req.user = null;
//     }

//     next();
// }

module.exports = {
    checkForAuthantication,
    restrictToRoles,
};
