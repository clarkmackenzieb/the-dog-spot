const axios = require("axios")

const addDog = (req,res) => {
    req.app.get("db").add_dog();
}

const getDogs = (req,res) => {}

const favoriteDog = (req,res) => {}

const upvoteDog = (req,res) => {}

const adoptDogs = (req,res) => {}

const getShelters = (req,res) => {}

const getUserFavs = (req,res) => {}

const getUserDogs = (req,res) => {}

module.exports = {
    addDog,
    getDogs,
    favoriteDog,
    upvoteDog,
    adoptDogs,
    getShelters,
    getUserFavs,
    getUserDogs
}
