import React from 'react';

//ALERTS WITH TASTIFY
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//REQUESTS
import * as RequestLogin from '../requests/RequestLogin';

//ROUTER
import {Link, useHistory} from 'react-router-dom';

import Cookie from 'universal-cookie'

//STYLES
import '../../styles/login/login.scss';

const cookie = new Cookie()

function Login() {
    const history = useHistory();

    const submitLogin = async (e) => {
        e.preventDefault();
        const username  = document.getElementById('username').value;
        const passw = document.getElementById('passw').value;
        
        if(username.trim("").length === 0 || passw.trim("").length === 0){    
            return toast.error('Empty form');    //LOGIN ERROR
        }

        await RequestLogin.login(username, passw)
        .then(response =>{
            const {message, idUser} = response;
            if(message === 'Incorrect username')
                return toast.error(message);
            if(message === 'Wrong password')
                return toast.error(message);

            cookie.set('id_user', idUser, {path:'/'});
        });

        toast.success('Succeful login!')
        return setTimeout(()=>{
                history.push("/");      //SUCCESSFUL LOGIN
                window.location.reload();
        }, 2000);
        
    }

    return (
        <section className="login-container">
            <ToastContainer/>
            <div className="title">
            </div>
            <div className="form-login bg-dark p-4 my-5 rounded">
                <form onSubmit={(e) => submitLogin(e)} method="post" className="p-4">
                    <div className="mb-3">
                        <label className="form-label text-light">Username</label>
                        <input type="text" name="username" className="form-control" id="username" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-light">Password</label>
                        <input type="password" name="passw" className="form-control" id="passw" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success mx-3">Login</button>
                        <Link to="/register" className="btn btn-primary mx-3">Register</Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login;