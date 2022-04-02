const express = require('express');
const router = express.Router();
const games = require("../games.json");


router.get('/', (req, res) => {

    res.render("index", {games});

});

/* router.get("/fourchette", (req,res) => {


    res.render("fourchette");
})

router.get("/diceRoller", (req,res) =>{
    res.render("diceRoller");
})
*/


router.get("/:name", (req, res) => {
    const game = games.find( game => {
        return req.params.name === game.name;
    })
    if(game) {
        res.render(game.name, {games, css: game.cssFile});
    } else {
        res.status(404).send("webiste not found");
    }
})




module.exports = router;