const db = require("../db/models")
const { Op } = db.Sequelize
const dateFormat = function (date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = date.getDate() + 1;
  day = day < 10 ? "0" + day : day;
  const newFormat = `${year}-${month}-${day}`;
  return newFormat;
}

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
  },
  add: function (req, res) {
    db.Genre.findAll()
        .then(genres => {
            res.render('moviesAdd', {
                genres
            })
        })
},
create: function (req, res) {
    db.Movie.create({
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length,
        genre_id: req.body.genre_id
    }),

        res.redirect('/movies')
},
edit: function (req, res) {
   db.Genre.findAll()
        .then(genres => {
            db.Movie.findByPk(req.params.id, {
                include: [{
                    association: 'genre'
                }]
            })
                .then(Movie => {
                    const formatDate = dateFormat(Movie.release_date)
                    res.render('moviesEdit', { Movie, genres, formatDate });
                })
        })
},
update: function (req, res) {
    db.Movie.update({
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length,
        genre_id: req.body.genre_id
    }, {
        where: {
            id: req.params.id
        }
    })

    res.redirect('/movies');

},
borrar: function (req, res) {
    db.Movie.findByPk(req.params.id)
        .then(Movie => {
            res.render('moviesDelete', { Movie });
        })
},
destroy: function (req, res) {
    db.Movie.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/movies');
}
}