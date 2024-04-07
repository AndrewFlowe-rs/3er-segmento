module.exports = (Sequelize, DataTypes) => {
    const movie = sequalize.define("movie", {
        id: {
            type: DataTypes.INTEGER,
            primarikey: true
        },
        created_at: {
            type: DataTypes.DATEONLY,
        },
        updated_at: {
            type: DataTypes.DATEONLY,
        },
        title: {
            type: DataTypes.STRING(100),
        },
        rating: {
            type: DataTypes.DECIMAL(1, 1),
        },
        awards: {
            type: DataTypes.INTEGER,
        },
        release_date: {
            type: DataTypes.DATEONLY,
        },
        length: {
            type: DataTypes.INTEGER,
        },
        genre_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Genre', // Nombre del modelo de la tabla relacionada
                key: 'id',
            }
        }

    }, {
        tableName: "movies",
        timestamps: false

    });
    return movie;
};