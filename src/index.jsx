import React from 'react';
import {render} from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import Entry from './entry'

console.log('!!')
const reRender = () => {
    render((
        <Entry/>
    ), document.getElementById('app-root'));
};
reRender();

if (__DEVELOPMENT__) {
    if (module.hot) {
        module.hot.accept('./entry', () => {
            reRender();
        });
    }
}
