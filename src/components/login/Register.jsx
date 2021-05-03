import React from 'react';

//ALERTS WITH TASTIFY
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//REQUESTS
import * as RequestLogin from '../requests/RequestLogin';

//ROUTER
import {useHistory, Link} from 'react-router-dom';

//STYLES
import '../../styles/login/login.scss';

function Register() {
    const history = useHistory();

    const registerUser = async (e) => {
        e.preventDefault();
        const username  = document.getElementById('username').value;
        const passw = document.getElementById('passw').value;
        const repeatPassw = document.getElementById('repeat-passw').value;
        
        if(username.trim("").length === 0 || passw.trim("").length === 0 || repeatPassw.trim("").length === 0){    
            return toast.error('Empty form');    //REGISTER ERROR
        }

        if(passw !== repeatPassw){
            return toast.error('Passwords are not equals');
        }

        else{
            const results = await RequestLogin.register(username, passw, repeatPassw);

            if(results.message === 'User already register') //VERIFY IF THE USERNAME IS ALREADY REGISTER
                return toast.error('Username already exist');
            else{
                toast.success('Register completed!', {pauseOnFocusLoss:false})
                return history.push("/login");
                                                    //SUCCESSFUL REGISTER
            }
            
            
        }
        
    }

    return (
        <section className="login-container">
            <ToastContainer/>
            <div className="title">
            </div>
            <div className="form-login bg-dark p-4 my-5 rounded">
                <form onSubmit={(e) => registerUser(e)} method="post" className="p-4">
                    <div className="mb-3">
                        <label className="form-label text-light">Username</label>
                        <input type="text" name="username" className="form-control" id="username" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-light">Password</label>
                        <input type="password" name="passw" className="form-control" id="passw" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-light">Repeat Password</label>
                        <input type="password" name="repeat-passw" className="form-control" id="repeat-passw" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary mx-3">Register</button>
                        <Link to="/login" className="btn btn-danger mx-3">Cancel</Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Register;