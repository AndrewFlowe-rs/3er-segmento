const db = require("../db/models")
const { Op } = db.Sequelize

module.exports = {
  list: (req, res) => {

    db.Movie.findAll()
      .then((movies) => {

        res.render("moviesList", {
          movies
        })

      })
      .catch((err) => {
        res.send(err.message)
      })
  },
  add: (req, res) => {
    res.render("createMovie")
  },
  create: (req, res) => {
    db.Movie.create({
      title: req.body.title,
      rating: req.body.rating,
      awards: req.body.awards,
      release_date: req.body.release_date,
      length: req.body.length,
    });
    res.redirect("/movies")

  },

  edit: (req, res) => {
    const { id } = req.params
    db.Movie.findByPk(id)
      .then((movie) => {
        res.render("editMovie", {
          movie
        })
      })
  },
  update: function (req, res) {
    db.Movie.update({
      title: req.body.title,
      rating: req.body.rating,
      awards: req.body.awards,
      release_date: req.body.release_date,
      length: req.body.length
    }, {
      where: {
        id: req.params.id
      }
    })

    res.redirect('/movies');

  },
  borrar: (req, res) => {
    const { id } = req.params
    db.Movie.findByPk(id)
      .then(Movie => {
        res.render('moviesDelete', { Movie });
      })
  },
  destroy: (req, res) => {
    db.Movie.destroy({
      where: {
        id: req.params.id
      }
    })
    res.redirect('/movies');
  },


  detail: (req, res) => {
    const { id } = req.params
    db.Movie.findByPk(id)
      .then((movie) => {
        res.render("moviesDetail", {
          movie
        })
      })
      .catch((err) => {
        res.send(err.message)
      })
  },

  new: (req, res) => {
    db.Movie.findAll({
      order: [
        ["release_date", "desc"]
      ]
    })
      .then((movies) => {
        res.render("newestMovies", {
          movies
        })
      })
      .catch((err) => {
        res.send(err.message)
      })
  },

  recommended: (req, res) => {
    db.Movie.findAll({
      where: {
        [Op.and]: [
          {
            rating: {
              [Op.gte]: 8
            }
          },
          {
            awards: {
              [Op.gte]: 2
            }
          }
        ]
      },
      order: [
        ["release_date", "desc"],
        ["rating", "desc"],
        ["title", "desc"]
      ]
    })
      .then((movies) => {
        res.render("recommendedMovies", { movies })
      })
      .catch((err) => {
        res.send(err.message)
      })
  }
}