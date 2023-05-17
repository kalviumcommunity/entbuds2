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

router.get("/likedmovie/:email", async (req, resp) => {
    try{
        const { email } = req.params;
        const liker = await list.findOne({email});
        if(liker) {
            resp.json({msg: "Success", movies: liker.likedFilms})
        } else return resp.json({msg: "User not found"})
    } catch (e) {
        return resp.json({msg: "Error"})
    }
})

// router.put("/delete", async (res, resp) => {
//     try{
//         const { email, filmId } = req.body;
//         const adder = await list.findOne({email});
//         if (adder) {
//             const { likedFilms } = adder;
//             const filmIndex = likedFilms.findIndex(({id}) => id === filmId);
//             if(!filmIndex)
//                 res.statusCode(400).send({ msg: "Film not found"});
//                 likedFilms.splice(filmIndex, 1);
//                 await list.findByIdAndUpdate(
//                     adder._id,
//                     {
//                         likedFilms
//                     },
//                     {new: true}
//                 )
//         }
//         return resp.json({msg: "Film deleted", movies: adder.likedFilms});
//     } catch(e) {
//         console.log(e);
//         return resp.json({msg: "Error"})
//     }
// })

router.put("/delete", async (req, resp) => {
    try {
      const { email, filmId } = req.body;
      const adder = await list.findOne({ email });
      if (adder) {
        const { likedFilms } = adder;
        const filmIndex = likedFilms.findIndex(({ id }) => id === filmId);
        if (filmIndex !== -1) {
          likedFilms.splice(filmIndex, 1);
          await adder.save();
          return resp.json({ msg: "Film deleted", movies: adder.likedFilms });
        } else {
          return resp.status(400).send({ msg: "Film not found" });
        }
      }
      return resp.status(400).send({ msg: "User not found" });
    } catch (e) {
      console.log(e);
      return resp.status(500).json({ msg: "Error" });
    }
  });
  



module.exports = router;