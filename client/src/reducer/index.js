const initialState={
    dogs :[],
    allDogs: [],
    temperaments: [],
    detail: [],
}


function rootReducer(state= initialState, action){
        switch(action.type){
            case 'GET_DOGS':
                return{
                    ...state,
                    dogs: action.payload,
                    allDogs: action.payload
                }
                
                case 'FILTER_CREATED':
                    const allDog = state.allDogs
                    const createdFilter = action.payload === 'created'? allDog.filter(el => el.createdInDb) : allDog.filter(el => !el.createdInDb)
                    return{
                        ...state, 
                        dogs: action.payload === 'All'? state.allDogs : createdFilter
                    }
                case 'ORDER_BY_NAME':
                    let sortedArray = action.payload === 'asc'?
                        state.dogs.sort(function (a, b) {
                                if(a.name > b.name) {
                                    return 1;
                                }
                                if(a.name < b.name) {
                                    return -1;
                                }
                                return 0;
                            }) :
                            state.dogs.sort(function(a, b) {
                                if(a.name > b.name) {
                                    return -1;
                                }
                                if(a.name < b.name) {
                                    return 1;
                                }
                                return 0;
                            })
                            console.log(sortedArray);
                        return {
                            ...state,
                            dogs: sortedArray
            
                        }

                case 'ORDER_BY_WEIGHT':
                        let sortedArrWeight = action.payload === 'weight_max' ? 
                         state.dogs.sort(function (a, b){
                             
                         return b.weight_min - a.weight_min;
                         }) :
                         state.dogs.sort(function(a, b){
                            
                         return a.weight_min - b.weight_min;
                        })
                         return{
                               ...state,
                            dogs: sortedArrWeight
                         }
   
                case 'GET_NAME_DOGS':
                         return{
                             ...state,
                             dogs: action.payload
                         }

                case 'POST_DOG':
                         return{
                           ...state
                        }

                case 'GET_TEMPERAMENTS':
                         return{
                            ...state,
                            temperaments : action.payload
                        }
                case "GET_BY_TEMPERAMENTS":
                     const allDogs = state.allDogs;
                     const temperamentFiltered =
                        action.payload === "All"
                          ? allDogs : allDogs.filter(
                             (el) =>
                             el.temperament &&
                             el.temperament.split(", ").find((e) => e === action.payload)
                                          );
                                    //console.log("filtro temperamentos",allDogs)
                         return {
                            ...state,
                            dogs: temperamentFiltered,
                       };

                case 'GET_DETAIL':
                        return{
                            ...state,
                            detail: action.payload
                        }    

                default:
                    return state;
            }
    
    };
    

export default rootReducer