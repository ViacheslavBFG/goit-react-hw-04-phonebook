import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './module/ContactForm/ContactForm';
import ContactList from './module/ContactList/ContactList';
import Filter from './module/Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    if (this.state.contacts.some(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    const contactToAdd = { ...newContact, id: uuidv4() };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactToAdd],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContacts();

    return (
      <div>
        <h1>Phonebook</h1>

        <h2>Add Contact</h2>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
