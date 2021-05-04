import React, { useCallback, useEffect, useState } from 'react';

//REQUEST
import * as PostRequest from '../requests/RequestPost';

//ROUTER
import { Link, useParams, useHistory } from 'react-router-dom';

//ALERTS
import { ToastContainer, toast } from 'react-toastify';


function EditPost() {
    let { id } = useParams();
    let history = useHistory();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // HANDLERS
    const handleTilte = (titleVal) => {
        return setTitle(titleVal);
    }
    const handleContent = (contentVal) => {
        return setContent(contentVal);
    }


    const editAPost = async (e) => {
        e.preventDefault();
        setTitle(document.getElementById('title').value);
        setContent(document.getElementById('content').value);

        if (title.trim('').length === 0 || content.trim('').length === 0)
            return toast.error('Form can not be empty');

        const result = await PostRequest.editPost(title, content, id);
        if(result.message !== 'Updated')
            return toast.error('Unexpected error');
        
        toast.success('Post Updated!');
        history.push('/');
        return;
        
    }

    const getAPost = useCallback(() => {
        const result = PostRequest.getAPost(id);

        if(result.message !== 'get post success')
            return history.push('/');

        setTitle(result.result.title);
        setContent(result.result.content);
        return;
    }, [id, history])

    useEffect(() => {
        getAPost();
    }, [getAPost])

    return (
        <section className="edit-post">
            <ToastContainer />
            <article>
                <h4 className="text-center mt-5 h2">Edit a post</h4>
                <div className="form-login bg-dark p-4 my-5 rounded">
                    <form onSubmit={(e) => editAPost(e)} method="post" className="p-4" id="edit-form">
                        <div className="mb-3">
                            <label className="form-label text-light">Title</label>
                            <input onChange={(e) => { handleTilte(e.target.value) }} type="text" placeholder="60 max" value={title} name="title"
                                className="form-control" maxLength="60" id="title" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-light">Content</label>
                            <textarea value={content} onChange={(e) => handleContent(e.target.value)} placeholder="200 max" name="content"
                                className="form-control" maxLength="200" id="content" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary mx-3">Edit</button>
                            <Link to="/" className="btn btn-danger mx-3">Back to home</Link>
                        </div>
                    </form>
                </div>
            </article>
        </section>
    )
}

export default EditPost;