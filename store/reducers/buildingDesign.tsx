import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    design:{
        fetched:false
    }
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        writeDesign(state,action){
            state.design = {
                ...action.payload,
            }
        }

    },
})

// Action creators are generated for each case reducer function
export const {writeDesign} = userSlice.actions

export default userSlice.reducer
