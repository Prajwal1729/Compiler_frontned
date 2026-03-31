import api from "./api";

export const authSignUp = async(email,password)=>{
    try{
        const response = await api.post('/auth/signup/',{email,password});
        console.log("signup response",response);
        return response.data;
    }catch(error){
        console.error("Signup error:",error);
        throw error;
    }
};