import React from "react";
import './styles/Paginado.css'


export default function Paginado ({dogsPerPage, allDogs, paginado}){
    const pageNumber = []

    for(let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++){
        pageNumber.push(i)
    }

    return(
        <nav>
        <ul className='Paginado'>
           { pageNumber && 
            pageNumber.map(number => (
                <li className='number' key={number}>
                <button onClick={() => paginado(number)}>{number}</button>
                </li>
            ))}    
    
        </ul>
        
</nav>
    )

}  