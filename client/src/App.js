import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Login } from "./Login";
import { Register } from "./Register";
import Profile from './Profile';
import "./App.css";

const App = () => {
  const [currentForm, setCurrentForm] = useState('register');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/" 
            element={
              currentForm === "login" ? (
                <Login onFormSwitch={toggleForm} />
              ) : (
                <Register onFormSwitch={toggleForm} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
