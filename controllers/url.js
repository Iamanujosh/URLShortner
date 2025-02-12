const URL = require("../models/url");
const { nanoid } = require("nanoid");
const axios = require("axios");
//using for generate shortId
async function handleStoreUrl(req,res){
    const body = req.body;
    if(!body.url){return res.status(400).json({msg:"url is requires"})}
    const shortid = nanoid(8);
    const expiryMinutes = 1;
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes); 
    await URL.create({
        shortId: shortid,
        redirectUrl:body.url,
        urlClicks: 0,
        createdBy: req.user._id,
        expiresAt,
});

return res.render("home",{
    id:shortid,
})
}

//using to mapping short URL with redirect URL
async function handleRedirectUrl(req, res) {
    try {
        const { shortId } = req.params;
        const url = await URL.findOne({ shortId });

        // Check if URL exists
        
        if (!url) {
            return res.status(404).send("Shortened URL Not Found.");
        }
        if (url.expiresAt && url.expiresAt < new Date()) {
            return res.status(410).send("This short URL has expired");
        }
        //Get Ip address
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const userAgent = req.headers["user-agent"];
        // Get location from IP
        const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
        const location = `${data.country}`;

        //Adding in analytics
        url.urlClicks +=1;
        url.analytics.push({ip,location,device:userAgent});
        await url.save();
        res.redirect(url.redirectUrl);
    } catch (error) {
        console.error("Error in handleRedirectUrl:", error);
        res.status(500).send("Internal Server Error.");
    }
}


module.exports = {
    handleStoreUrl,
    handleRedirectUrl,
}