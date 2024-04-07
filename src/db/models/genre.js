module.exports = (Sequelize, DataTypes) => {
    const movie = sequalize.define("genre" , {
        id: {
            type : DataTypes.INTEGER,
            primarikey:true
        } ,
        created_at : {
            type : DataTypes.DATEONLY,
        },
        updated_at :{
            type : DataTypes.DATEONLY,
        },
        name:{
            type : DataTypes.STRING(100),
        },
        rating : {
            type : DataTypes.DECIMAL(1,1),
        },
        active  : {
            type : DataTypes.BOOLEAN,
        },
        tableName:"genre",
        timestamps: false
    })
    return genre
}