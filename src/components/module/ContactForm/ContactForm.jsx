import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={name}
          onChange={this.handleChange}
        />
        <input
          type="tel"
          name="number"
          placeholder="Phone Number"
          required
          value={number}
          onChange={this.handleChange}
        />
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onLoadContacts: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};

export default ContactForm;
