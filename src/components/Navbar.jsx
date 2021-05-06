import React, { useEffect, useState } from 'react';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faDoorOpen, faPlusSquare, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

//ROUTER
import { Link, useHistory } from 'react-router-dom';

//REQUESTS
import { getAllPosts } from './requests/RequestPost';
import { logout } from './requests/RequestLogin';

//ALERTS WITH TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//STYLES
import '../styles/nav.scss';

function NavBar() {
    const history = useHistory();

    const [logged, setLogged] = useState(false);
    const [dropMenu, setDropMenu] = useState(true);

    const openMenu = ()=>{
        const menu = document.querySelector(".drop-menu");
        if(dropMenu)
            menu.style.transform = "translateY(80px)";

        else
            menu.style.transform = "translateY(0px)";
        
        return setDropMenu(!dropMenu);
    }




    const getLogged = async () => {
        return await getAllPosts()
            .then(res => {
                if(!res.idUser){
                    return setLogged(false);
                }else{
                    return setLogged(true);
                } 
            })
    }

    const getLogout = async () => {
        await logout();
        toast.info('Sucessfull logout!');
        setTimeout(() => {
            window.location.reload();
            history.push("/")
        }, 2000);
    }

    useEffect(() => {
        getLogged();
    }, [])

    return (
        <React.Fragment>
            <div className="drop-menu">
                <div className="rigth d-flex justify-content-around align-items-center py-4">
                    {logged
                        ? <Link to="/create-post" id="create-post" className="btn btn-outline-primary mx-2">Create a post <FontAwesomeIcon icon={faPlusSquare} className="fa-lg" /></Link>
                        : <span style={{ display: 'none' }}></span>}
                    {!logged ?
                        <Link to="/login" className="link-login"><FontAwesomeIcon icon={faSignInAlt} className="fa-2x mx-4" id="icon-login" /></Link>
                        :
                        <Link to="/logout" className="link-login" onClick={() => { getLogout() }}><FontAwesomeIcon icon={faDoorOpen} className="fa-2x mx-4" id="icon-logout" /></Link>}
                </div>
            </div>

            <nav className="navbar">
                <ToastContainer />
                {/* RESPONSIVE MENU */}
                <div className="cont">
                    <Link to="/" className="navbar-brand mb-0">Mini-Blog</Link>

                    <button onClick={()=>{openMenu()}} className="btn btn-light" id="button-menu"><FontAwesomeIcon icon={faBars} className="fa-lg" /></button>

                    {/* MENU DESKTOP */}
                    <div className="desktop-menu">
                        <div className="rigth d-flex align-items-center">
                            {logged
                                ? <Link to="/create-post" id="create-post" className="btn btn-outline-primary mx-2">Create a post <FontAwesomeIcon icon={faPlusSquare} className="fa-lg" /></Link>
                                : <span style={{ display: 'none' }}></span>}

                            {!logged ?
                                <Link to="/login" className="link-login"><FontAwesomeIcon icon={faSignInAlt} className="fa-2x mx-4" id="icon-login" /></Link>
                                :
                                <Link to="/logout" className="link-login" onClick={() => { getLogout() }}><FontAwesomeIcon icon={faDoorOpen} className="fa-2x mx-4" id="icon-logout" /></Link>}
                        </div>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default NavBar;