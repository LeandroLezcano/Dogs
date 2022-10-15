import React,{ useState, useEffect }  from "react";
import {Link, useHistory} from 'react-router-dom';
import { postDog, getTemperaments } from "../actions";
import {useDispatch, useSelector} from 'react-redux';
import './styles/DogCreate.css'



function validate(input){
    console.log(input.temperament);
    let errors = {};
    if (!input.name){
        errors.name = 'Se requiere un Nombre';
    } else if(!input.height_min){
        errors.height_min = 'Ingrese un valor numerico';
    } else if(!input.height_max){
        errors.height_max = 'Ingrese un valor numerico';
    } else if(!input.weight_min){
        errors.weight_min = 'Ingrese un valor numerico';
    } else if(!input.weight_max){
        errors.weight_max = 'Ingrese un valor numerico';
    } else if(!input.life_span){
        errors.life_span = 'Ingrese un valor numerico';
    } else if(input.temperament.length <= 2){
        errors.input = 'Se requieren al menos tres(3) temperamentos'
    }
    return errors
};


export default function DogCreate(){
    const dispatch = useDispatch()
    const temperaments = useSelector((state)=>state.temperaments)
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name:'',
        height_min:'',
        height_max:'',
        weight_min:'',
        weight_max:'',
        life_span:'',
        image:'',
        temperament:[]
    })

    function handleChange(e){
        setInput ({
             ...input,
             [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
             [e.target.name] : e.target.value}))
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
        setErrors(validate({
            ...input,
            temperament: [...input.temperament, e.target.value]
        }))
    }

useEffect(()=>{
    dispatch(getTemperaments())
},[dispatch])


    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        setErrors(validate({...input}))
        if( Object.keys(errors).length === 0 && input.name !== "" && input.height_min !== "" && input.height_max !== "" && input.weight_min !== ""
        && input.weight_max !== "" && input.life_span !== "" && input.temperament.length !== 0 )

        {dispatch(postDog(input))
        alert ('¡Perro Creado!')
        setInput({
           name:'',
           height_min:'',
           height_max:'',
           weight_min:'',
           weight_max:'',
           life_span:'',
           image:'',
           temperament:[]
    })
     history.push('/home')}
     else{
        alert('Se deben completar los campos requeridos')
     }
}

function handleDelete(el){
    setInput({
    ...input,
    temperament: input.temperament.filter(occ => occ !== el)
    })
}

console.log(errors);
return(
    <div>
        <Link to='/home'><button className='create'>Volver</button></Link>
        <h1>¡Crea tu perro!</h1>
        <form onSubmit={(e)=> handleSubmit(e)}>
            <div className="form">
                <label>Nombre</label>
                <input
                autoComplete="off"
                type='text'
                value={input.name}
                name='name'
                onChange={handleChange}
                />
                {errors.name && (<p className="danger">{errors.name}</p>)}
            </div>
            <div className="form">
                <label>Altura minima</label>
                <input
                autoComplete="off"
                type='text'
                value={input.height_min}
                name='height_min'
                onChange={handleChange}
                />
                {errors.height_min && <p className="danger">{errors.height_min}</p>}
                <label>Altura maxima</label>
                <input
                autoComplete="off"
                type='text'
                value={input.height_max}
                name='height_max'
                onChange={handleChange}
                />
                {errors.height_max && <p className="danger">{errors.height_max}</p>}
            </div>
            <div className="form">
            <label>Peso minimo</label>
                <input
                autoComplete="off"
                type='text'
                value={input.weight_min}
                name='weight_min'
                onChange={handleChange}
                />
                {errors.weight_min && <p className="danger">{errors.weight_min}</p>}
                <label>Peso maximo</label>
                <input
                autoComplete="off"
                type='text'
                value={input.weight_max}
                name='weight_max'
                onChange={handleChange}
                />
                {errors.weight_max && <p className="danger">{errors.weight_max}</p>}
            </div>
            <div className="form">
                <label>Tiempo de vida</label>
                <input
                autoComplete="off"
                type='text'
                value={input.life_span}
                name='life_span'
                onChange={handleChange}
                />
                {errors.life_span && <p className="danger">{errors.life_span}</p>}
            </div>
            <div className="form">
            <label>Imagen</label>
                <input
                autoComplete="off"
                type='text'
                value={input.image}
                name='image'
                onChange={handleChange}
                />
                {errors.image && <p className="danger">{errors.image}</p>}
            </div>
                <label className="form">Temperamentos</label>
            <select onChange={(e) => handleSelect(e)}>
            {errors.temperament && <p>{errors.temperament}</p>}
                {temperaments && temperaments.map((temp)=>(
                    <option value={temp} key={temp}>{temp}</option>
                ))}
            </select>
            <ul><li>{input.temperament.map(el => el + ', ')}</li></ul>
            <button className="create-dog" type='submit'>¡Crear!</button>

        </form>
        {input.temperament.map(el=>
            <div>
                <p>{el}</p>
                <button onClick={() => handleDelete(el)}>X</button>
            </div>
        )}
    </div>
)
}

