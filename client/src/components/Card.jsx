import React from 'react';
import './styles/Card.css'
import { Link } from 'react-router-dom';


export default function Card({image, name, temperament, weight_min, weight_max, id}) {

    return(
        <Link className='link' to={`/detail/${id}`}>
        <div className='containerCard'>
            <h4>{name}</h4>

            <img className='cardImage' src={image} alt='img not found' width='220px' height='280px'/>

            <h5>Temperamentos: {temperament}</h5>

            <h5>Peso minimo: {weight_min}</h5>
            <h5>Peso maximo: {weight_max}</h5>
            
        </div>
        </Link>
    )
}