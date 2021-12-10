import React, { useContext , createContext, useReducer } from "react";

//Prepares the datalayer
export const DataLayerContext = createContext()

//Wrap our app and provide the data layer
export const DataLayer = ({initialState,reducer,children}) => {
    return(
        <DataLayerContext.Provider value={useReducer(reducer,initialState)} >
            {children}
        </DataLayerContext.Provider>
    )

}

export const useDataLayer = () => useContext(DataLayerContext)