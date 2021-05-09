import React from 'react';

//REQUEST
import {deletePost} from '../requests/RequestPost';

//ALERTS
import {ToastContainer, toast} from 'react-toastify';

//MOMMENT
import Momment from 'react-moment';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

//ROUTER
import { Link } from 'react-router-dom';

function PostList(props) {


    const requestDelete = async (id)=>{
        const result = await deletePost(id);
        if(result.message !== 'Post deleted')
            return toast.error('Unexpected error!');

        return window.location.reload();
        

    }

    return (
        <div className="card-posts">
            <ToastContainer/>
            <div className="title d-flex justify-content-between">
                <h5 className="text-primary">{props.post.title}</h5>
                {
                    props.idUser === props.post.idUser
                    ?   <div> 
                            <Link to={`/post/${props.post.id}`} className="mx-2 icons">
                                <FontAwesomeIcon icon={faEdit} className="fa-lg"/>
                            </Link>
                            <span onClick={()=> requestDelete(props.post.id)} id="delete-icon" className="text-danger mx-2 icons">
                                <FontAwesomeIcon id="icono-borrar" icon={faTrash} className="fa-lg"/>
                            </span>
                        </div>
                        
                    : <span></span>
                }
            </div>
            <p className="text-light">{props.post.content}</p>
            <div className="final-card">
                <Momment className="date" fromNow>{props.post.date_modify}</Momment>
                <span>Author: {props.post.user}</span>
            </div>
        </div>
    )
}


export default PostList;