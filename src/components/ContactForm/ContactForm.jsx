import { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Name, Number, SubmitBtn } from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
    
    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.onAddContact(this.state);
        this.setState({
          name: '',
          number: '',
        });
}

  render() {
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <label htmlFor="name">Name</label>
        <Name
          id="name"
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="number">Number</label>
        <Number
          id="number"
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.handleChange}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <SubmitBtn
          type="submit"
        >
          Add contact
        </SubmitBtn>
      </Form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
