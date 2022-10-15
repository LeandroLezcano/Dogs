import React from "react";
import { Link } from 'react-router-dom';
import './styles/LandingPage.css'


export default function LandingPage(){
    return(
       <div>
           <div className='All'>
               <div className='landing'>
                   <div>
                       <h1>Bienvenidos a la App de Dogs</h1>
                       <p>Esta aplicacion funciona como libro de perros. <br />Podes buscar un perro por nombre, tipo de temperameneto y mas. <br /> ¡Tambien podes compartir tu perro creandolo!</p>
                       <Link to ='/home'>
                           <button>Ingresar</button>
                       </Link>
                    </div>
                </div>
            </div>          
       </div>  
    )
}

