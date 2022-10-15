import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";
import './styles/SearchBar.css'

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleChange(e){
        e.preventDefault();
        setName(e.target.value);
        
        
    }

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(getNameDogs(name));
        setName('');
        
        
    }

    return(
        <div>
            <input
            className="select"
            type ='text'
            placeholder="Buscar..."
            onChange={(e)=> handleChange(e)}
            value={name}
            />
            <button className="buscar" type='submit' onClick={(e)=> handleOnSubmit(e)}>Buscar</button>
        </div>
    )
}