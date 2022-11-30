import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './feautures/basketSlice'
import restaurantReducer from './feautures/restaurantSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer
  },
})