import api from  "./api";

export const Languages = async()=>{
    try{
        const response = await api.get('/auth/languages/');
        // console.log(response);
        return response.data;

    }catch(error){
        console.error("fetch languages error:",error);
        throw error;
    }
}