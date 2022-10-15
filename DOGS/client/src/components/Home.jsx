import react from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDogs, getTemperaments, filterCreated, orderByName, orderByWeight, getByTemperaments } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card'
import Paginado from './Paginado';
import './styles/Paginado.css'
import SearchBar from './SearchBar';
import './styles/Home.css'

export default function Home(){
    const dispatch = useDispatch()
    const allDogs = useSelector((state)=>state.dogs)
    const allTemperaments = useSelector((state) => state.temperaments);
    console.log(allTemperaments);
    
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getDogs())
        dispatch(getTemperaments())
    },[dispatch])

function handleClick(e){
    e.preventDefault()
    dispatch(getDogs())
}
function handleTemperaments(e){
    e.preventDefault()
    dispatch(getByTemperaments(e.target.value))
    
}

function handleFilterCreated(e){
    e.preventDefault()
    dispatch(filterCreated(e.target.value))
}

function handleSort(e){
    e.preventDefault(e);
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
}

function handleSortWeight(e){
    e.preventDefault(e);
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
}



console.log(currentDogs);
return(
    <div>
        
        <button className='actualizar' onClick={e=> {handleClick(e)}}>Actualizar</button>
        <div className='inputs'>
                <p>Filtrar por:</p>
            <select className='select' onChange={e=> {handleFilterCreated(e)}}>
                <option value='all'>Todos</option>
                <option value='api'>Existentes</option>
                <option value='created'>Creados</option>
            </select>
                <p>Ordenar por:</p>
            <select className='select' onChange={e=> {handleSort(e)}}>
                    <option value= 'asc'>A - Z</option>
                    <option value= 'desc'>Z - A</option>
                </select>
                </div>
                <div><p>Ordenar por:</p>
                <select className='select' onChange={e=> {handleSortWeight(e)}}>
                    <option value= 'weight'>Peso</option>
                    <option value= 'weight_min'>De menor a mayor</option>
                    <option value= 'weight_max'>De mayor a menor</option>
                </select>
          
                <div className='temperamentos'>Temperamentos:</div>
                <select className='select' onChange={handleTemperaments}>
                {allTemperaments && allTemperaments.map((temp)=>(
                    <option value={temp} key={temp}>{temp}</option>
                ))}
                </select>
            

                <div className='Paginado'>
                <Paginado 
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
                </div>
                
                <SearchBar/>
                
                <div >
                    <Link className='btn-link' to='/dog'><button className='btn-crear'>Crear Perro</button></Link>
                </div>

               <div className='Card'> 
               {currentDogs?.map(el =>{

                    return(
                <div>
                    <Card image={el.image? el.image : 'https://t2.uc.ltmcdn.com/es/posts/7/6/6/como_dibujar_un_perro_adorable_38667_600.jpg'} name={el.name} temperament={!el.createdInDb? el.temperament : el.temperaments.map(e=>e.name + " ") } weight_min={el.weight_min} weight_max={el.weight_max} key={el.id} id={el.id}/>
                </div>
                    ) })
            }
            
        </div>
        
        </div>
    </div>
)

}