const addImage = (arr) =>{
    const challenged = arr.map((driver)=>{
        if(!driver.image?.url.length){
            return{
                ...driver,  
                image:{
                    url:'https://img.freepik.com/foto-gratis/coche-deportivo-brillante-conduciendo-pista-deportiva-iluminada-ia-generativa_188544-53590.jpg'
                }
            }
        } else {
            return driver;
        }
    });
    return  challenged
};
module.exports = addImage;