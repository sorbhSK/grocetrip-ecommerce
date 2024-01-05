import { configureStore } from '@reduxjs/toolkit'
import AuthenticateSlice from './Slice/Authentication'

const rootReducer = {
    'User': AuthenticateSlice  ,
}

const store = configureStore({
  reducer: rootReducer,
})


export default store