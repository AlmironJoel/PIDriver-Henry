import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import style from './CreateDriver.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getTeams } from '../../redux/actions/actions';
import f1 from '../../assets/f1-createdriver.png'


const CreateDriver = () => {
  const dispatch = useDispatch()
  const allTeams = useSelector((state) => state.teams)

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    if(allTeams.length===0){
    dispatch(getTeams());
  }
  }, [dispatch],allTeams.length)


  const [form, setForm] = useState({
      nombre: "",
      apellido: "",
      descripcion: "",
      image:"",
      nacionalidad: "",
      FechaDeNacimiento: "",
      teamName: [],
     });

  // Errores en el formulario
  const [errors, setErrors] = useState({
    nombre: "",
      apellido: "",
      descripcion: "",
      image:"",
      nacionalidad: "",
      FechaDeNacimiento: "",
      teamName: "",
  });
  console.log(form);

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    
     setErrors(validate({
       ...form, 
       [e.target.name]: e.target.value,
     }))
  }

  const handleTeamSelection = (e) => {
    const selectedTeamOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setForm({
      ...form,
      teamName: selectedTeamOptions,
    });

    setErrors({
      ...errors,
      teamName: selectedTeamOptions.length === 0 ? 'Select at least one team' : '',
    });
  };

  const removeSelectedTeam = (indexToRemove) => {
    const updatedSelectedTeams = [...form.teamName];
    updatedSelectedTeams.splice(indexToRemove, 1);
    setForm({
      ...form,
      teamName: updatedSelectedTeams,
    });
  };
  
  const handleSubmit = (e) => {

    e.preventDefault();
    axios.post('http://localhost:3001/drivers/', form)
    
      .then((res) => {
          alert ('Creado Correctamente')
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setErrorMessage(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          console.log(error.request);
          setErrorMessage('Error: No response received from server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setErrorMessage(`Error: ${error.message}`);
        }
        setSuccessMessage('');
      });

  }

  //?VALIDACIONES
  const validate = (form) => {
    let errors = {}

    if (!form.nombre) {
      errors.nombre = 'Insert a valid nombre';
    } else if (!/^[a-zA-Z\s]+$/.test(form.nombre)) {
      errors.nombre = 'The name must only contain letters and spaces';
    } else if (form.nombre.length > 50) { // Cambia 50 al número máximo de caracteres permitidos
      errors.nombre = 'The name is too long. Maximum length is 50 characters.';
    }
    if (!form.apellido) {
      errors.apellido = 'Insert a valid apellido';
    } else if (!/^[a-zA-Z\s]+$/.test(form.apellido)) {
      errors.apellido = 'The name must only contain letters and spaces';
    } else if (form.apellido.length > 50) { // Cambia 50 al número máximo de caracteres permitidos
      errors.apellido = 'The name is too long. Maximum length is 50 characters.';
    }    
    
    if (!form.nacionalidad) {
      errors.nacionalidad = 'Insert a valid nacionalidad';
    } else if (!/^[a-zA-Z\s]+$/.test(form.nacionalidad)) {
      errors.nacionalidad = 'The nacionalidad must only contain letters and spaces';
    } else if (form.nacionalidad.length > 50) { // Cambia 50 al número máximo de caracteres permitidos
      errors.nacionalidad = 'The name is too long. Maximum length is 50 characters.';
    } 

    if (!form.descripcion) {
      errors.descripcion = 'Insert a valid descripcion'
    } else if (form.descripcion.length < 10) {
      errors.descripcion = 'descripcion must be at least 10 characters';
    }
    if (!form.image) {
      errors.image = 'Insert a date of birth'
    } else if (!form.image.startsWith('https://') && !form.image.startsWith('http://')){
       errors.image = 'Insert a valid URL image' 
    }

    if (!form.FechaDeNacimiento) {
      errors.FechaDeNacimiento = 'Insert a valid date of birth';
    } else {
      const currentDate = new Date();
      const minDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  
      // Compara la fecha de nacimiento con la fecha mínima permitida
      if (new Date(form.FechaDeNacimiento) > minDate) {
        errors.FechaDeNacimiento = 'You must be at least 18 years old.';
      }
    }

    if (!form.teamName || form.teamName.length === 0) {
      errors.teamName = 'Select at least one team';
    } else {
      errors.teamName = '';
    }
    

    return errors;
  }

  return (
    <div className={style.fatherContainer}>
      <div>
        <h2 className={style.title}>Create New Driver</h2>
      </div>
      <div className={style.container}>
        <div className={style.sidebar}>
          <img src={f1} alt="Create Driver Logo" className={style.logo} /> 
        </div>
        <div className={style.formContainer}>
          <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
          
          {/* NOMBRE */}
               <div className={style.formLabel}> <label>Forename: </label></div>
                <input 
                  type="text"
                  name="nombre"
                  onChange={handleInputChange}
                  value={form.nombre}
                />
            </div>
              {
                errors.nombre && (<p className={style.errorMessage}>{errors.nombre}</p>)
              }   

              {/* //APELLIDO */}
             <div className={style.formGroup}>
               <div className={style.formLabel}><label className={style.formLabel}>Surname: </label></div>
                <input 
                  type="text"
                  name="apellido"
                  onChange={handleInputChange}
                  value={form.apellido}
                />
              </div>
              {
                errors.apellido && (<p className={style.errorMessage}>{errors.apellido}</p>)
              }

              {/* //IMAGEN*/}
              <div className={style.formGroup}>
                <div className={style.formLabel}><label>Image URL: </label></div>
                <input 
                  type="text"
                  name="image"
                  onChange={handleInputChange}
                  value={form.image}
                />
              </div>
              {
                errors.image && (<p className={style.errorMessage}>{errors.image}</p>)
              }

              {/* //NACIONALIDAD */}
             <div className={style.formGroup}>
               <div className={style.formLabel}><label>Nationality: </label></div>
                <input 
                  type="text"
                  name="nacionalidad"
                  onChange={handleInputChange}
                  value={form.nacionalidad}
                />
              </div>
              {
                errors.nacionalidad && (<p className={style.errorMessage}>{errors.nacionalidad}</p>)
              }

              {/* //FECHA NACIMIENTO */}
              <div className={style.formGroup}>
                 <div className={style.formLabel}><label>Date of Birth: </label></div>
                <input 
                  type="date"
                  name="FechaDeNacimiento"
                  onChange={handleInputChange}
                  value={form.FechaDeNacimiento}
                />
              </div>
              {
                errors.FechaDeNacimiento && (<p className={style.errorMessage}>{errors.FechaDeNacimiento}</p>)
              }
              {/* //DESCRIPCION               */}
              <div className={style.formGroup}>
              <div className={style.formLabel}><label>Description: </label></div>
                <textarea 
                  type="text"
                  name="descripcion"
                  onChange={handleInputChange}
                  value={form.descripcion}
                />
              </div>
              {
                errors.descripcion && (<p className={style.errorMessage}>{errors.descripcion}</p>)
              }  

            {/* //TEAM */}
          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label>Teams</label>
            </div>
            <select name="teamName" value={form.teamName} onChange={(e) => handleTeamSelection(e)} multiple>
              {allTeams?.map((team) => (
                <option key={team.id} value={team.teamName}>
                  {team.teamName}
                </option>
              ))}
            </select>
            <span className={style.errorMessage}>{errors.teamName}</span>
          </div>
          <div className={style.selectedTeams}>
          {form.teamName.map((teamName, index) => (
              <div key={index} className={style.selectedTeam}>
                <span>{teamName}</span>
                <button
                  type="button"
                  className={style.removeTeamButton}
                  onClick={() => removeSelectedTeam(index)}
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>

          <button type="submit"className={style.button} disabled={Object.values(errors).some((error) => error)} >Create New Driver</button>              
          </form>
        </div>  

      </div>

      {successMessage && (
        <div className={style.alertSuccess}>{successMessage}</div>
      )}
      {errorMessage && (
        <div className={style.alertError}>{errorMessage}</div>
      )}      
    </div> 

  )
}

export default CreateDriver;
