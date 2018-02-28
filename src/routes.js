import React from "react";
import { Switch, Route } from "react-router-dom";


import Home from "./Components/Home/Home";
import UserPage from "./Components/UserPage/UserPage";
import DogUpload from "./Components/DogUpload/DogUpload";
import DogVote from "./Components/DogVote/DogVote";
import SearchPage from "./Components/SearchPage/SearchPage";

export default(
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/upload" component={DogUpload} />
        <Route path="/vote" component={DogVote} />
        <Route path="/adoption" component={SearchPage} />
        <Route path="/user" component={UserPage} />
    </Switch>
)
