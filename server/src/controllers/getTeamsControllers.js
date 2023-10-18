const { Teams } = require("../db");
const axios = require("axios");

const getTeamsController = async () => {
  const dbTeams = await Teams.findAll();
  const cleanTeams = new Set();

  if (dbTeams.length === 0) { 
    const allDrivers = [];
    const apiData = (await axios.get("http://localhost:5000/drivers")).data; 
    apiData.map((driver) => allDrivers.push(driver.teams));

   
    apiData.forEach((driver) => {
        if (driver.teams) {
          const teamsArr = driver.teams.split(",").map((elem) => elem.trim()); // Divide y elimina espacios
          teamsArr.forEach((teamName) => {
            cleanTeams.add(teamName); 
          });
        }
      });
    }
    const teamsOK = Array.from(cleanTeams).map((nombre) => ({
      teamName: nombre,
    }));
    await Teams.bulkCreate(teamsOK);
    return dbTeams;
  };
  module.exports = { getTeamsController };
  