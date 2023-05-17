const express = require("express");
const router = express.Router();
const list = require("../schemas/listSchema");

router.post("/add", async (req, resp) => {
    try{
        const { email, data } = req.body;
        const adder = await list.findOne({email});
        if(adder){
            const {likedFilms} = adder;
            const alreadyLiked = likedFilms.find(({id}) => (id === data.id));
            if(!alreadyLiked){
                await list.findByIdAndUpdate(adder._id, {
                    likedFilms: [...adder.likedFilms, data],
                },
                {new: true}
                );
            } else return resp.json({ msg: "Film is already liked"});
        } else await list.create({ email, likedFilms: [data]});
        return resp.json({ msg: "Added successfully"});
    } catch (e) {
        return resp.json({ msg: "Not added"})
    }
})

module.exports = router;