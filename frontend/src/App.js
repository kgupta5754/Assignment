 // App.js
import React from 'react';
import ContactList from './component/ContactList';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contacts Management</h1>
      <ContactList />
    </div>
  );
};

export default App;



