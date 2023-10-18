const {createDriver} = require('../controllers/postDriversControllers')
const {getDriversControllers} = require('../controllers/getDriversControllers')
const {getNameControllers} = require ('../controllers/getNameControllers')
const getIdController = require ('../controllers/getIdControllers')
const getDriverHandler = async (req ,res) => {
    try {
        const {name} = req.query
        if(name){
            const filteredDrivers = await getNameControllers(name);
            res.status(200).json(filteredDrivers)
        } else{
            const allDrivers = await getDriversControllers();
            res.status(200).json(allDrivers)
        } 
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

const getDetailHandler = async (req,res) => {
    try {
       const {id} = req.params
       if(id){
           const IdController = await getIdController(id) 
           res.status(200).json(IdController)
       }
   } catch (error) {
    res.status(400).json({error:error.message})
   }
    
}   

const postDriverHandler = async(req, res) => {
    const {nombre,
        apellido,
        descripcion,
        image,
        nacionalidad,
        FechaDeNacimiento,
        teamName}=req.body

    try {
       const created = await createDriver(
        nombre,
        apellido,
        image,
        descripcion,
        nacionalidad,
        FechaDeNacimiento,
        teamName
        );
        res.status(201).json(created)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports={
    getDetailHandler,
    getDriverHandler,
    postDriverHandler
}