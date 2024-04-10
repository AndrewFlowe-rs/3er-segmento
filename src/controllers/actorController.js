const db = require ("../db/models");

const {Op} = db.Sequelize;
module.exports= {
    list: (req,res) => {
        db.Actor.findAll()
        .then((actors)=>{
            res.render("actorList",{
                actors
            })
        })
        .catch((err) => {
            res.send(err.message)
          }) 
    },
    detail: (req, res) => {
        const { id } = req.params
        db.Actor.findByPk(id)
            .then((actor) => res.render("actorDetail", {
                actor
            }))
            .catch((err) =>{
                 res.send(err.message)
    })
},
        recommendedA: (req,res) => {
            db.Actor.findAll({
            where : {
              [Op.and]: [ {  
                
                      rating: {
                        [Op.gte]: 5
                      }
                    },
                ]
            },
            order : [
                ["rating" , "desc"]
            ]
            })
            .then((actors)=>{
                res.render("actorRecomended",{ actors })
            })

        }
    }
   