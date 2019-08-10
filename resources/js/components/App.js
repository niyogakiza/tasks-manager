import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from "./Header.js";
import ProjectsList from "./ProjectsList.js";
import NewProject from "./NewProject.js";
import SingleProject from "./SingleProject.js";

function App () {
    return (
        <BrowserRouter>
            <Fragment>
                <Header/>
                <Switch>
                    <Route exact path='/' component={ProjectsList}/>
                    <React path='/create' component={NewProject}/>
                    <Route path='/:id' component={SingleProject}/>
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
}


ReactDOM.render(App, document.getElementById('app'));
