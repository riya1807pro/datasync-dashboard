import { createSlice } from "@reduxjs/toolkit";

const initialState={
    category:"all",
}

const newsSlice = createSlice({
    name:"news",
    initialState,
    reducers:{
        setCategory(state,action){
            state.category = action.payload
        }
    }
})

export const {setCategory} = newsSlice.actions;
export default newsSlice.reducer;