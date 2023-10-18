const axios = require ('axios');
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const addImage = require('../helpers/addImage')
const { Driver,Teams } = require("../db");
const URL =  "http://localhost:5000/drivers";

const getNameControllers = async (name) =>{
    const {data} = await axios.get(`${URL}`);
    const nameToLower = name.toLowerCase();
    const filteredDrivers = data.filter((driver) =>
    driver.driverRef.toLowerCase().includes(nameToLower)
    );

    const filteredDB = await Driver.findAll({
        where: { apellido: { [Op.iLike]: `%${nameToLower}%` } },
        include: [
            {
              model: Teams,
              as: "Teams",
              attributes: ["id", "teamName"],
              through: {
                attributes: [],
              },
            },
          ],
      });
    if(filteredDrivers.length === 0 && filteredDB.length === 0){
        throw Error('Driver no encontrado.')
    }    
    const challengedFilters = addImage(filteredDrivers) //verifica que contengan img

    return [...challengedFilters.slice(0,15),...filteredDB.slice(0, 15)];
};

module.exports={getNameControllers}