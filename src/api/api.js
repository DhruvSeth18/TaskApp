import axios from 'axios';
const URL = 'https://taskserver-ab.up.railway.app';

export const UserLogin = async (data) => {
    try {
        const response = await axios.post(`${URL}/notes/login`, data, {
            timeout: 2000,
        });
        console.log(response);
        return {
            status: response.data.status,
            message: response.data.message,
            token: response.data.token,
            username: response.data.username
        }
    }
    catch (error) {
        console.log("Error is ", error.response);
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        else{
            return {
                status:'fail',
                message:'Not Working, Server is Down'
            }
        }
    }
}

export const signingUser = async (data) => {
    try {
        const response = await axios.post(`${URL}/notes/signup`, data, {
            timeout: 2000,
        });
        return {
            status:response.data.status,
            user:response.data.user
        }
    }
    catch (error) {
        if(error.response?.status>=400){
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        else{
            return {
                status:'fail',
                message:'Not Working, Server is Down'
            }
        }
    }
}

export const NotesGet = async (UrlName) => {
    try {
        console.log(localStorage.getItem("token"));
        const response = await axios.get(`${URL}/notes/${UrlName}`, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },{
            timeout: 2000,
        })
        if(response.status===204){
            return{
                status:'empty',
                message:'No Data Found'
            }
        }
        return{
            status:response.data.status,
            userNotes:response.data.userNotes,
        }
    }
    catch (error) {
        if(error.response.status>=400){
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            console.log("Unauthorised Access");
            return {
                status:error.response.data.status,
                message:error.response.data.message
            }
        }
        return{
            status:'fail',
            message:'Not Working, Server is Down'
        }
    }
}


export const DeleteNote = async (username,Id) => {
    try {
        console.log(`/${URL}/notes/${username}/${Id}`);
        const response = await axios.delete(`${URL}/notes/${username}/${Id}`, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }, {
            timeout: 2000,
        });
        return{
            status:response.data.status
        }
    }
    catch (error) {
        if(error.response?.status>=400){
            return{
                status:error.response.data.status,
                message:"Server Error"
            }
        }
        return{
            status:'fail',
            message:'Not Working, Server is down'
        }
    }
}

export const updateNote = async (username,data, Id) => {
    try {
        const response = await axios.post(`${URL}/notes/${username}/${Id}`, data, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }, {
            timeout: 2000,
        })
        return {
            status:response.data.status,
            Notes: response.data.Notes
        }
    } catch (error) {
        if(error.response?.status>=400){
            return {
                status:error.response.data.status,
                message:error.response.data.message
            }
        }
        return{
            status:'fail',
            message:'Not Working ,Server is Down'
        }
    }
}

export const CreateNotes = async (username,data)=>{
    try {
        const response = await axios.post(`${URL}/notes/${username}`, data, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }, {
            timeout: 2000,
        })
        console.log(response);
        return {
            status:response.data.status,
            note:response.data.note
        };
    } catch (error) {
        if(error.response?.status>=400){
            return{
                status:error.response.data.status,
                message:"Mongo Validation Error"
            }
        }
        return{
            status:error.response.data.status,
            message:"Not Working, Server is Down"
        }
    }
}