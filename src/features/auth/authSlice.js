import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";



const user=JSON.parse(localStorage.getItem('user'));


const initialState = {

    user: user ? user :null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''


}

export const register=createAsyncThunk('auth/register',async (user,thunkAPI)=>{

    try {

        return await authService.register(user.email,user.password,user.displayName)

    } catch (error) {
        
        const message=error.message;

        return thunkAPI.rejectWithValue(message);
    }


})

export const login=createAsyncThunk('auth/login',async (user,thunkAPI)=>{

    try {

        return await authService.login(user.email,user.password)

    } catch (error) {
        
        const message=error.message;

        return thunkAPI.rejectWithValue(message);
    }


})
export const logout=createAsyncThunk('auth/logout',async (_,thunkAPI)=>{

    try {

        await authService.logout();

    } catch (error) {
        
        const message=error.message;

        return thunkAPI.rejectWithValue(message);
    }


})

export const authSlice = createSlice({

    name: 'authSlice',
    initialState,
    reducers: {

        reset: (state)=>{
            state.isError = false
                state.isSuccess = false
                state.isLoading = false
                state.message = ''

        }

    },

    extraReducers:(builder)=>{

        builder
        //register cases
            .addCase(register.pending,(state)=>{

                state.isLoading=true
            })
            
            .addCase(register.fulfilled,(state,action)=>{

                state.isLoading=false
                state.isSuccess=true
                state.user=action.payload
            })
            .addCase(register.rejected,(state,action)=>{

                state.isLoading=false
                state.user=null
                state.isError=true
                state.message=action.payload

            })
                //login cases
            .addCase(login.pending,(state)=>{

                state.isLoading=true
            })
            
            .addCase(login.fulfilled,(state,action)=>{

                state.isLoading=false
                state.isSuccess=true
                state.user=action.payload
            })
            .addCase(login.rejected,(state,action)=>{

                state.isLoading=false
                state.user=null
                state.isError=true
                state.message=action.payload

            })

            //logout
            .addCase(logout.fulfilled,(state,action)=>{

                
                state.isSuccess=true
                state.user=null
            })
            .addCase(logout.rejected,(state,action)=>{
            
                state.isError=true
                state.message=action.payload

            })
    }
 
})

export const {reset}=authSlice.actions;
export default  authSlice.reducer; 