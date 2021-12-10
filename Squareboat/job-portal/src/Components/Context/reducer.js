export const initialState = {

  
    postedJobs: [],
    candidates:[],
    logout:false
}

const reducer = (state,action) => {

    switch(action.type){


            case 'SET_JOBS':
                return{
                    ...state,
                    postedJobs:[...action.arrayData]
                }
            case 'SET_APPLICATIONS':

            if(action?.arrayData === undefined){
                return{
                    ...state,
                    candidates:[]
                }
            }else{
                return{
                    ...state,
                    candidates:[...action.arrayData]
                }
 
            }

            case 'SET_LOG':
                return{
                    ...state,
                    logout:action.value
                }
            default:
                return state
    }

}

export default reducer;

