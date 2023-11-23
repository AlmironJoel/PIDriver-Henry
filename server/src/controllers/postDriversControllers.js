const axios = require("axios");
const { Sequelize } = require("sequelize");
const { Driver, Teams } = require("../db");
const Op = Sequelize.Op;

const createDriver = async (nombre, apellido,image,descripcion,nacionalidad,FechaDeNacimiento,teamName,) => {
  const apiUrl = "http://localhost:5000/drivers";
  const toLowForname = nombre.toLowerCase();
  const toLowSurname = apellido.toLowerCase();
  const toLowNationality = nacionalidad.toLowerCase();

  const filteredDB = await Driver.findAll({
    where: {
      nombre: { [Op.iLike]: `%${toLowForname}%` },
      apellido: { [Op.iLike]: `%${toLowSurname}%` },
      nacionalidad: { [Op.iLike]: `%${toLowNationality}%` },
    },
  });

  const resp = await axios.get(`${apiUrl}`);
  const matchingObjects = resp.data.filter((obj) => {
    return (
      obj.name?.surname === nombre &&
      obj.name?.lastname === apellido &&
      obj.nationality === nacionalidad &&
      obj.dob === FechaDeNacimiento
    );
  });

  if (matchingObjects.length === 0 && filteredDB.length === 0) {
    const newDriver = await Driver.create({
      nombre,
      apellido,
      image,
      descripcion,
      nacionalidad,
      FechaDeNacimiento,
      teamName,
    });
    if (teamName) {
      //  const teamNames = teamName.split(",");

      const searchTeam = await Teams.findAll({
        where: { teamName: { [Op.in]: teamName } },
      });
      const response = await newDriver.addTeams(searchTeam);
      return newDriver;
    }
    return newDriver;
  } else throw Error("Ya existe el driver");
};
module.exports = {createDriver};