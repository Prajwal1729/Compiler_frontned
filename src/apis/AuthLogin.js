import api from "./api";

export const authLogin = async(email,password) => {
    try{
        const response = await api.post("/auth/login/",{email,password});
        console.log("Login response:", response);
        return response.data;
    }catch(error){
        console.error("Login error:", error);
        throw error;
    }
};