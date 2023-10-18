const axios = require ('axios');
const { Driver, Teams } = require("../db");
const URL =  "http://localhost:5000/drivers";
const addImage = require('../helpers/addImage')

const getDriversControllers = async () =>{
 const {data} = await axios.get(`${URL}`);
 const allApi = addImage(data);
 const allDB = await Driver.findAll({
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

 return [...allApi, ...allDB];
};

module.exports ={getDriversControllers} 