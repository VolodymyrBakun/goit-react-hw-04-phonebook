import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    const parsedLocalContacts = JSON.parse(localContacts) ?? [];

    this.setState({ contacts: parsedLocalContacts})
  };

  componentDidUpdate(_ , prevState) {
if (prevState.contacts.length !== this.state.contacts.length) {
  const stringifiedContacts = JSON.stringify(this.state.contacts);
  localStorage.setItem('contacts', stringifiedContacts)
}
  }

  onFormSubmit = ({ name, number }) => {
    if (name === '') {
      alert('Please fill in the name and phone number!');
      return;
    }

    const isExist = this.state.contacts.find(
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

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, contact] };
    });
  };

  handleSearch = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  contactsToRender = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleDelete = idToDelete => {
    this.setState(prevState => {
      const filtredContacts = prevState.contacts.filter(
        contact => contact.id !== idToDelete
      );
      return { contacts: filtredContacts };
    });
  };

  render() {
    const contactsData = this.contactsToRender();
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.onFormSubmit} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} handleSearch={this.handleSearch} />
        <ContactList contacts={contactsData} toDelete={this.handleDelete} />
      </Container>
    );
  }
}
