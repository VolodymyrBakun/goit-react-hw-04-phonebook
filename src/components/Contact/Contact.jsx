import PropTypes from 'prop-types';
import { DeleteBtn } from './Contact.styled';

export const Contact = ({ contact, toDelete }) => {
  return (
    <li>
      {contact.name}: {contact.number}{' '}
      <DeleteBtn type="button" onClick={() => toDelete(contact.id)}>
        Delete
      </DeleteBtn>
    </li>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  }).isRequired,
  toDelete: PropTypes.func.isRequired,
};
