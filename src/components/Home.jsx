import React, { useEffect, useState } from 'react';

//STYLES
import '../styles/home.scss';

//MODULES
import * as Request from './requests/RequestPost';
import PostList from './posts/PostList.jsx';

function Home() {
    const [posts, setPosts] = useState([]);
    const [idUser, setIdUser] = useState(0);

    
    const getPosts = async () => {
        await Request.getAllPosts().then((res) => {
            setPosts(res.posts);
            setIdUser(res.idUser);
        });
    }
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <section className="home">
            <h4 className="text-center my-3 h3">Posts</h4>
            <article className="container-posts">
                <div className="post-list">
                    {posts.map((post) => {
                        return (<PostList post={post} idUser={idUser} key={post.id} />)
                    })}
                </div>
            </article>
        </section>
    )
}

export default Home;