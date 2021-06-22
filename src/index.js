import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
import {ShowAddProjectProvider} from './context/showAddProjectContext'
import {ShowQuickAddTaskProvider} from './context/showQuickAddTaskContext'


ReactDOM.render(
  <Router>
     <ShowAddProjectProvider>
      <ShowQuickAddTaskProvider>
        <App />
      </ShowQuickAddTaskProvider>
     </ShowAddProjectProvider>
  </Router>,
  document.getElementById('root')
);
