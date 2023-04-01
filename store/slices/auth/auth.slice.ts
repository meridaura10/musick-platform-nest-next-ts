import { IauthState } from "@/types/auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { checkAuth, fetchLogin, fetchRegister } from "./authAsyncThunk";
import { ITrack } from "@/types/track";


const initialState: IauthState = {
error: '',
isLoading: false,
isChackAuthLoading: false,
user: null
}

export const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        removeTrackUser: (state,actions) =>{
            if (state.user) {
                state.user.tracks = state.user.tracks.filter(e => e._id !== actions.payload)
            }
          },
          addTrackUser: (state,actions: PayloadAction<ITrack>) =>{
            state.user?.tracks.push(actions.payload)
          }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchLogin.pending,(state,actions) =>{
            state.isLoading = true
            state.error = ''
            state.user = null
        })
        .addCase(fetchLogin.fulfilled,(state,actions) =>{
            state.isLoading = false
            state.error = ''
            state.user = actions.payload.user
            localStorage.setItem('token',actions.payload.accessToken)
        })
        .addCase(fetchLogin.rejected,(state,actions) =>{
            state.isLoading = false
            state.error = actions.payload as string
            state.user = null
        })
        .addCase(fetchRegister.pending,(state,actions) =>{
            state.isLoading = true
            state.error = ''
            state.user = null
        })
        .addCase(fetchRegister.fulfilled,(state,actions) =>{
            state.isLoading = false
            state.error = ''
            state.user = actions.payload.user
            localStorage.setItem('token',actions.payload.accessToken)
        })
        .addCase(fetchRegister.rejected,(state,actions) =>{
            state.isLoading = false
            state.error = actions.payload as string
            state.user = null
        })

        .addCase(checkAuth.pending,(state,actions) =>{
            state.isLoading = true
            state.isChackAuthLoading = true
            state.error = ''
            state.user = null
        })
        .addCase(checkAuth.fulfilled,(state,actions) =>{
            state.isChackAuthLoading = false
            state.isLoading = false
            state.error = ''
            state.user = actions.payload.user
            localStorage.setItem('token',actions.payload.accessToken)
        })
        .addCase(checkAuth.rejected,(state,actions) =>{
            state.isLoading = false
            state.isChackAuthLoading = false
            state.error = actions.payload as string
            state.user = null
        })
    },
})

export const AuthActions = authSlice.actions
export const AuthReducers = authSlice.reducer