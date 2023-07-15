import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [toFilter, setToFilter] = useState('');
  const fistRender = useRef(true);

  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');
    const parsedLocalContacts = JSON.parse(localContacts) ?? [];

    setContacts(parsedLocalContacts);
  }, []);

  useEffect(() => {
    if (fistRender.current) return () => (fistRender.current = false);

    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const onFormSubmit = ({ name, number }) => {
    const isExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([...contacts, contact]);
  };

  const handleSearch = value => {
    setToFilter(value);
  };

  const contactsToRender = () => {
    const normalizedFilter = toFilter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDelete = idToDelete => {
    const filtredContacts = contacts.filter(
      contact => contact.id !== idToDelete
    );
    setContacts(filtredContacts);
  };

  const contactsData = contactsToRender();
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onFormSubmit} />

      <h2>Contacts</h2>
      <Filter filter={toFilter} handleSearch={handleSearch} />
      <ContactList contacts={contactsData} toDelete={handleDelete} />
    </Container>
  );
}
