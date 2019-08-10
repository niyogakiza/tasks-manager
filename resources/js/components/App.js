import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const App = () => (
    <BrowserRouter>
        <div>
            <Header/>
        </div>
    </BrowserRouter>
);

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
