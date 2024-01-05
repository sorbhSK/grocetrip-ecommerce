import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const UserLogin = createAsyncThunk('login',async(data)=>{
    try {
        const response = await axios.post('http://localhost:5000/createuser',data)
        console.log(response.data)
        if(response.data){
            localStorage.setItem('userc',JSON.stringify(response.data))
        }
    } catch (error) {
        throw error
    }
})


const initialState = {
    Auth:{pending:false,data:null,error:null}
}
const Authenticate = createSlice({
    name:'Authenticate',
    initialState,
    reducers:{}
})

export default Authenticate.reducer