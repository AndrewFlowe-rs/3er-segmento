module.exports = (sequelize, DataTypes) => {
    const alias = "Actor"
        const cols = {
        id :{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,

      },
      last_name: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.DECIMAL(2,1),
      },
    

    };
    const config = {
        timestamps: true,
        tablename :"actors",
        createdAt: "created_at",
      updatedAt: "updated_at" 
    };
    const Actors = sequelize.define(alias,cols,config);
    return Actors;
}