const db = require("../db/models")
const {Op} = db.Sequelize
module.exports = {
  list:(req,res) => {
    db.Genre.findAll()
    .then((genres) => {
      res.render("genresList",{
        genres
      })
      // .catch((err) => {
      //   res.send(err.message)
      // }) 
    })
  },

  detail: (req,res) => {
    const{id} = req.params
    db.Genre.findByPk(id)
    .then((genres) => res.render("genresDetail"),{
      genres
    })
    .catch((err) => {
      res.send(err.message)
    }) 
  }
}