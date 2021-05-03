import React from 'react';
import axios from 'axios';

//ROUTER
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//STYLES
import 'bootstrap/dist/css/bootstrap.min.css';

//COMPONENTS
import NavBar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import CreatePost from './components/posts/CreatePost.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/login/Register.jsx';
import EditPost from './components/posts/EditPost.jsx';


axios.defaults.withCredentials = true;

function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
        <Switch>
          {/* POSTS */}
          <Route path="/create-post" component={CreatePost} />
          <Route path="/post/:id" component={EditPost}/>

          {/* LOG IN */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          {/* HOME */}
          <Route path="/" component={Home} />

        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
