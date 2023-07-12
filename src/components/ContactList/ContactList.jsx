import { Contact } from 'components/Contact/Contact';
import PropTypes from 'prop-types';
import { List } from './ContactList.styled';

export const ContactList = ({ contacts, toDelete }) => {
  return (
    <>
      <List>
        {contacts.map(contact => {
          return (
            <Contact contact={contact} toDelete={toDelete} key={contact.id} />
          );
        })}
      </List>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  toDelete: PropTypes.func.isRequired,
};
