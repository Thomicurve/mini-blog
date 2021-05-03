import React from 'react';

//REQUESTS
import {submitAPost} from '../requests/RequestPost';

//ROUTER
import {Link} from 'react-router-dom';

//ALERTS
import {ToastContainer, toast} from 'react-toastify';

function CreatePost(){


    const submitPost = async (e) =>{
        e.preventDefault();
        let title = document.getElementById("title").value;
        let content = document.getElementById("content").value;

        if(title.trim('').length === 0 || content.trim('').length === 0)
            return toast.error('Form can not be empty!');

        if(title.length > 60 || content.length > 200)
            return toast.error('Unexpected error');

        const results = await submitAPost(title, content);

        if(results.message !== 'Uploaded')
            return toast.error('Unexpected error');

        else{
            toast.success('Post uploaded!');
            document.getElementById('create-form').reset();
            return;
        }
        
        
        
    }

    return(
        <section className="create-post">
            <ToastContainer/>
            <article>
                <h4 className="text-center mt-5 h2">Create a post</h4>
                <div className="form-login bg-dark p-4 my-5 rounded">
                <form onSubmit={(e) => submitPost(e)} method="post" className="p-4" id="create-form">
                    <div className="mb-3">
                        <label className="form-label text-light">Title</label>
                        <input type="text" placeholder="max 60" name="title" 
                        className="form-control" maxLength="60" id="title" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-light">Content</label>
                        <textarea placeholder="max 200" name="content" 
                        className="form-control" maxLength="200" id="content"/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary mx-3">Create</button>
                        <Link to="/" className="btn btn-danger mx-3">Back to home</Link>
                    </div>
                </form>
            </div>
            </article>
        </section>
    )
}

export default CreatePost;