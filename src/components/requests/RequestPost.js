import axios from 'axios';

const link = process.env.LINK_API || 'https://mini-blog-api.herokuapp.com' || 'http://localhost:4000';

const getAllPosts = async ()=>{
    const posts = await axios.get(`${link}/posts`).then(result => {
        return result.data;
    }); 
    return posts;
}

const submitAPost = async (title, content)=>{
    return await axios.post(`${link}/posts`,
    {
        title: title,
        content: content
    })
    .then(res =>{
        return res.data;
    })
}

const getAPost = async (id)=>{
    const post = await axios.get(`${link}/posts/${id}`)
    .then(result =>{
        return result.data;
    })
    return post;
}

const editPost = async (title, content, id) =>{
    return await axios.put(`${link}/posts/${id}`,
    {title: title, content:content})
    .then(result =>{
        return result.data;
    })
}

const deletePost = async (id) =>{
    return await axios.delete(`${link}/posts/${id}`)
    .then(result =>{
        return result.data;
    })
}



export {getAllPosts, submitAPost, getAPost, editPost, deletePost};