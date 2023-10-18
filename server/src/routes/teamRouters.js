const {Router} = require('express')
const {getTeamsHandler}=require('../Handle/teamHandlers')
const teamRouters =Router()
//Rutas de teams
teamRouters.get('/',getTeamsHandler)

module.exports=teamRouters