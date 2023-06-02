import { configureStore } from '@reduxjs/toolkit'
import buildingDesign from "./reducers/buildingDesign";

export const store = configureStore({
    reducer: {
        buildingDesign,
    },
})
