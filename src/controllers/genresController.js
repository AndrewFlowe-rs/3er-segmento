const db = require("../db/models")
const {Op} = db.Sequelize
module.exports = {
  list:(req,res) => {
    db.Genre.findAll()
    .then((genre) => {
      res.render("genresList",{
        genres
      })
      .catch((err) => {
        res.send(err.message)
      }) 
    })
  },

  detail: (req,res) => {
    const{id} = req.params
    db.Genre.findByPK(id)
    .then((genre) => res.render("genresDetail"),{
      genre
    })
    .catch((err) => {
      res.send(err.message)
    }) 
  }
}