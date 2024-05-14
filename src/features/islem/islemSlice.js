import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import islemService from './islemService'

// initialState düzeltildi
const initialState = {
    islemler:[],
    aylar: [],
    yillar: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const aylarGetir = createAsyncThunk('islem/aylarGetir', async (_, thunkAPI) => {
    try {
        return await islemService.aylarGetir();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
       
export const yillarGetir = createAsyncThunk('islem/yillarGetir', async (_, thunkAPI) => {
    try {
        return await islemService.yillarGetir();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const islemEkle = createAsyncThunk('islem/islemEkle', async (veri, thunkAPI) => {
    try {
        return await islemService.islemEkle(veri);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const son10IslemGetir = createAsyncThunk('islem/son10IslemGetir', async (email, thunkAPI) => {
    try {
        return await islemService.son10IslemGetir(email);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


export const islemSlice = createSlice({
    name: 'isimSlice',
    initialState,
    reducers: {
        reset: (state => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(aylarGetir.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(aylarGetir.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.aylar = action.payload;
            })
            .addCase(aylarGetir.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(yillarGetir.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(yillarGetir.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.yillar = action.payload;
            })
            .addCase(yillarGetir.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.yillar = [] ;
            })
            .addCase(islemEkle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(islemEkle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.islemler.unshift(action.payload);
                
            })
            .addCase(islemEkle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
               
            })
            .addCase(son10IslemGetir.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(son10IslemGetir.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.islemler= action.payload;
                
            })
            .addCase(son10IslemGetir.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.islemler=[]
               
            });
    } 
});

export const { reset } = islemSlice.actions;

export default islemSlice.reducer;
