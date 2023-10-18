const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Teams } = require("../db");

const getNameTeamController = async (name) => {
  const filteredDB = await Teams.findAll({
    where: { teamName: { [Op.iLike]: `%${name}%`} },
  });
  if (filteredDB.length === 0) {
    throw Error("No se encontró team.");
  }
  return [...filteredDB.slice(0, 50)];
};
module.exports = { getNameTeamController };