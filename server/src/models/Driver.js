const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      allowNull:false,
      defaultValue:DataTypes.UUIDV4//genera un id
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    image:{
      type: DataTypes.STRING, 
      allowNull: true,
    },
    nacionalidad:{
      type:DataTypes.STRING,
      allowNull:false
    },
    FechaDeNacimiento:{
      type:DataTypes.STRING,
      allowNull:false
    },

  },{ timestamps: false });
};