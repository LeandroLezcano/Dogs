import React  from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from '../actions'
import { Link, useParams } from "react-router-dom";


export default function Detail(){
    const dispatch = useDispatch()
    const myDog = useSelector((state)=> state.detail)
    const {id} = useParams()
   
useEffect(()=>{
    dispatch(getDetail(id));
}, [dispatch, id])


return(
    <div>
        <Link to='/home'>
            <button>Volver</button>
        </Link>
        {
            myDog.length > 0 ?
            <div>
                <h1>{myDog[0].name}</h1>
                <img src={myDog[0].image ? myDog[0].image : "https://t2.uc.ltmcdn.com/es/posts/7/6/6/como_dibujar_un_perro_adorable_38667_600.jpg"} alt=""/>
                <div> 
                  <h2 >Tamaño: </h2>
                  <p>{myDog[0].height_min}  -  </p>
                  <p>{myDog[0].height_max}  Centimetros</p>
                </div>
                <div>
                   <h2>Peso: </h2>
                   <p>{myDog[0].weight_min}  -  </p>
                   <p>{myDog[0].weight_max}  Kilogramos</p>
                </div>
                <h2>{myDog[0].life_span}</h2>
                <h2>Temperamentos: </h2>
                <p>{!myDog[0].createdInDb ? myDog[0].temperament : myDog[0].temperaments.map(e=>e.name + " ")}</p>
            </div> : <p>Loading..</p> 
                
        }

    </div>
)


}