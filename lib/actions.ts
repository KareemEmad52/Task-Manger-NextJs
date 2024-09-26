"use server"

import axios from "axios"
import { loginFormData, registerFormData, TaskFormData } from "./types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const login = async (data: loginFormData) =>{
  try {
    const res = await axios.post('https://task-mangement-express-ts.vercel.app/api/v1/users/login',data)
    cookies().set('authToken', res.data.data.token);
    return {
      success: true,
      data: res.data,  // Ensure this is serializable
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error
      return {
        success: false,
        error: error.response?.data?.message || 'An error occurred during the request',
      };
    } else if (error instanceof Error) {
      // General error (non-Axios)
      return {
        success: false,
        error: error.message,
      };
    } else {
      // Fallback for unknown error types
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  }  
}


export const register = async (data: registerFormData) =>{
  try {
    const res = await axios.post('https://task-mangement-express-ts.vercel.app/api/v1/users/register',data)
    return {
      success: true,
      data: res.data, 
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.message || 'An error occurred during the request',
      };
    } else if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    } else {
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  }  
}



export const addTask = async (data: TaskFormData,token: string | null) =>{
  try {
    if (!token) {
      throw new Error("Token is missing");
    }
    const res = await axios.post('https://task-mangement-express-ts.vercel.app/api/v1/tasks/',data,{
      headers: {
        token: `${token}`
      }
    })
    revalidatePath('/')
    return {
      success: true,
      data: res.data, 
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.message || 'An error occurred during the request',
      };
    } else if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    } else {
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  }  
}


export const updateTask = async (taskId:string,data: Partial<TaskFormData>,token: string | null) =>{
  try {
    if (!token) {
      throw new Error("Token is missing");
    }
    const res = await axios.put(`https://task-mangement-express-ts.vercel.app/api/v1/tasks/${taskId}`,data,{
      headers: {
        token: `${token}`
      }
    })
    revalidatePath('/')
    return {
      success: true,
      data: res.data, 
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.message || 'An error occurred during the request',
      };
    } else if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    } else {
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  }  
}


export const DeleteTask = async (taskId:string,token: string | null) =>{
  try {
    if (!token) {
      throw new Error("Token is missing");
    }
    const res = await axios.delete(`https://task-mangement-express-ts.vercel.app/api/v1/tasks/${taskId}`,{
      headers: {
        token: `${token}`
      }
    })
    revalidatePath('/')
    return {
      success: true,
      data: res.data, 
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.message || 'An error occurred during the request',
      };
    } else if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    } else {
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  }  
}