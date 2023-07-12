import styled from '@emotion/styled';

const Form = styled.form`
  width: 240px;
  padding: 20px;
  border: 2px solid black;
  margin: auto;
  margin-bottom: 20px;
  background-color: lightgrey;
`;

const Name = styled.input`
  margin-left: 10px;
  margin-top: 10px;
`;

const Number = styled.input`
  margin-left: 10px;
  margin-top: 10px;
`;

const SubmitBtn = styled.button`
  margin-top: 10px;
  border-radius: 10px;
  &:hover {
    background-color: grey;
  }
  &:active {
    background-color: grey;
  }
`;

export {Form, Name, Number, SubmitBtn}