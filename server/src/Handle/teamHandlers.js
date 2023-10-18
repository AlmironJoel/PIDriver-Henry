const{getTeamsController} = require ('../controllers/getTeamsControllers')
const{getNameTeamController}= require('../controllers/getEquipoControllers')

const getTeamsHandler = async (req,res)=>{
    try {
    const {name} = req.query
    if(name){
        const equipofiltrado = await getNameTeamController(name)
        res.status(200).json(equipofiltrado)
    } else {
    const allTeams = await getTeamsController()
    res.status(200).json(allTeams)
    }
    } catch (error) {
    res.status(500).json({error:error.message})
    }
}



// const getTeamsHandler = (req,res) =>{
//     res.status(200).send('Aqui estan todos los Teams')
// }

module.exports={getTeamsHandler}