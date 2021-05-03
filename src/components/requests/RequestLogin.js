import axios from 'axios';

const link = process.env.HOST || 'http://localhost:4000';

const login = async (username, passw) =>{
    return await axios.post(`${link}/login`, {
        username: username,
        passw: passw
    },).then(res =>{
        console.log(res.data);
        return res.data;
    });
}

const logout = async ()=>{
    return await axios.get(`${link}/logout`)
    .then(res =>{
        return res.data;
    })
}

const register = async (username, passw, repeatPassw) =>{
    return await axios.post(`${link}/register`, {
        username: username,
        passw: passw,
        repeatPassw: repeatPassw
    })
    .then(res => {
        return res.data;
    })
}

export {login, logout, register};