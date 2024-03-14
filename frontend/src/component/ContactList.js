// ContactList.js
import React, { useState, useEffect } from 'react';
import AddEditContactForm from './AddEditContactForm';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); 

  useEffect(() => {
    fetchData();
  }, [currentPage]); 

  const fetchData = async () => {
    try {
      const response = await fetch(`/contacts?page=${currentPage}&pageSize=${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const addContact = async (newContact) => {
    try {
      const response = await fetch('/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });
      if (!response.ok) {
        throw new Error('Failed to add contact');
      }
      fetchData();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const updateContact = async (updatedContact) => {
    try {
      const response = await fetch(`/contacts/${updatedContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });
      if (!response.ok) {
        throw new Error('Failed to update contact');
      }
      fetchData();
      setEditContact(null);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`/contacts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      fetchData();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const searchContact = async (term) => {
    setSearchTerm(term);
    if (term) {
      try {
        const response = await fetch(`/contacts/search?term=${term}`);
        if (!response.ok) {
          throw new Error('Failed to search contacts');
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error searching contacts:', error);
      }
    } else {
      fetchData();
    }
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>Contact List</h2>
      <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => searchContact(e.target.value)} />
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.email}
            <button onClick={() => setEditContact(contact)}>Edit</button>
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <AddEditContactForm onSubmit={editContact ? updateContact : addContact} contact={editContact} />
      <div>
        {Array.from({ length: Math.ceil(contacts.length / pageSize) }, (_, i) => (
          <button key={i} onClick={() => handlePagination(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
