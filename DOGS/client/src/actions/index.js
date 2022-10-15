import axios from 'axios';


// me traigo todas las razas de perros de la api
export function getDogs(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3003/dogs')

        return dispatch({
            type: 'GET_DOGS',
            payload: json.data

        })
    }
}


export function filterCreated(payload){
        return{
            type :'FILTER_CREATED',
            payload
        }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
    return{
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function getNameDogs(name){
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3003/dogs?name=' + name);
            return dispatch ({
                type: 'GET_NAME_DOGS',
                payload: json.data
            })
        } 
        catch (error) {
            console.log(error)
        }
    }
}

export function getTemperaments() {
    return async function(dispatch){
        var json = await axios.get("http://localhost:3003/temperaments",{

        });
        console.log(json.data);
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
  
}
export function getByTemperaments(payload){
     return{
         type: "GET_BY_TEMPERAMENTS",
         payload
     }
 }

export function postDog(payload){
    return async function (){
        const response = await axios.post('http://localhost:3003/dog', payload)
        return response;
    }
}

export function getDetail(id){
    return async function(dispatch){
    try {
            var json = await axios.get(`http://localhost:3003/dogs/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        } 
        
    }
}