module.exports = (sequelize, DataTypes) => {
    const alias = "Movie";
    const cols = {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.DECIMAL(3, 1),
      },
      awards: {
        type: DataTypes.INTEGER,
      },
      release_date: {
        type: DataTypes.DATE,
      },
      length: {
        type: DataTypes.INTEGER,
      },
    };
  
    const config = {
      timestamps: true,
      tableName: "movies",
     createdAt: "created_at",
      updatedAt: "updated_at" 
    
    };
  
    const Movie = sequelize.define(alias, cols, config);
     Movie.associate = function (models) {
      Movie.belongsTo(models.Genre, {
        as : "genre",
        foreignKey: "genre_id",
      })

      Movie.belongsToMany(models.Actor, {
        as: "actors",
        through: "actor_movie",
        foreignKey: "movie_id",
        otherKey: "actor_id",
        timestamps: false
      })
     }
    return Movie;
  };
  