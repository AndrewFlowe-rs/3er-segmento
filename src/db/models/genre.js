module.exports = (sequelize, DataTypes) => {
    const alias = "Genre";
    const cols = {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ranking: {
        type: DataTypes.INTEGER,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
    };
  
    const config = {
      timestamps: true,
      tableName: "genres",
      createdAt: "created_at",
      updatedAt: "updated_at" 
    
    };
  
    const Genre = sequelize.define(alias, cols, config);
    Genre.associate = function (models) {
      Genre.hasMany(models.Movie, {
        as: "movies",
        foreignKey: "genre_id",
      });
    }
    return Genre;
  };