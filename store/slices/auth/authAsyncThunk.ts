import $api from "@/http";
import { AuthResponse } from "@/types/auth";
import { Iuser } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const fetchLogin = createAsyncThunk<
  AuthResponse,
  {
    email: string;
    password: string;
  }
>("auth/fetchLogin", async ({ email, password }, thunkAPI) => {
  try {
    const res = await $api.post<AuthResponse>(`${process.env.BACKEND_URL}auth/login`, {
      email,
      password,
    });
    return res.data
  } catch (error: any) {    
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const fetchRegister = createAsyncThunk<
AuthResponse,
  {
    email: string;
    password: string;
    name: string
  }
>("auth/fetchRegister", async ({ email, password,name }, thunkAPI) => {
  try {
    const res = await $api.post<AuthResponse>(`${process.env.BACKEND_URL}auth/registration`, {
      email,
      password,
      name,
    });
    return res.data
  } catch (error: any) {    
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});


export const checkAuth = createAsyncThunk<
AuthResponse,
 undefined
>("auth/checkAuth", async (_, thunkAPI) => {
  try {
    const res = await $api.post<AuthResponse>(`${process.env.BACKEND_URL}auth/refresh`,{
      withCredentials: true,
    })
    return res.data
  } catch (error: any) {    
    console.log(error);
    
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

