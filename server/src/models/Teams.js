const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
   sequelize.define('Teams', {
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue:DataTypes.UUIDV4
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },{ timestamps: false });//no muestra fecha de modificacion.
};