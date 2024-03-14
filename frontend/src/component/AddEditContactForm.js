
import React, { useState } from 'react';

const AddEditContactForm = ({ onSubmit, contact }) => {
  const [name, setName] = useState(contact ? contact.name : '');
  const [email, setEmail] = useState(contact ? contact.email : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">{contact ? 'Update' : 'Add'} Contact</button>
    </form>
  );
};

export default AddEditContactForm;
