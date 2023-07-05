import React from 'react';
import './App.css';
import { useState } from 'react';
import Loginregister from './components/Loginregister';
import Crud from './components/Crud';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    const email = 'users@gmail.com';
    const password = 'password';

    if (email === 'users@gmail.com' && password === 'password') {
      setLoggedIn(true);
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="App">
      {loggedIn ? (
        <Crud />
      ) : (
        <Loginregister onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;