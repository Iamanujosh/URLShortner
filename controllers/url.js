const URL = require("../models/url");
const { nanoid } = require("nanoid");

async function handleStoreUrl(req,res){
    const body = req.body;
    if(!body.url){return res.status(400).json({msg:"url is requires"})}
    const shortid = nanoid(8);
    
    await URL.create({
        shortId: shortid,
        redirectUrl:body.url,
        urlClicks: 0,
});

return res.render("home",{
    id:shortid,
})
}

async function handleRedirectUrl(req,res){
    const {shortId} = req.params;
    const url = await URL.findOne({shortId});
    await URL.updateOne({shortId}, {$inc: { urlClicks: 1 }});
    res.redirect(url.redirectUrl);
    

}

module.exports = {
    handleStoreUrl,
    handleRedirectUrl,

}