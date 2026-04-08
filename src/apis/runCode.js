import api from './api';

export const runCode = async(code,language)=>{
    try{
        const response = await api.post('/auth/run/',{code,language});
        console.log(response);
        return response.data;
    }catch(error){
        console.error("run code error:",error);
        throw error;
    }

};