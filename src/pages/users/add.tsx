import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addUserRequest } from '../../redux/Users/actions';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button } from '@material-ui/core';
import User from '../../interfaces/User';

const AddUser = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleAddUser = (event: React.FormEvent) => {
    event.preventDefault();
    const user: User = {
      id: uuidv4(),
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      email: emailRef.current!.value,
      password: '123456',
      isDeleted: false,
    };
    dispatch(addUserRequest(user));
  };

  return (
    <form onSubmit={handleAddUser}>
      <div>
        <TextField
          required
          id="first-name"
          label="First Name"
          variant="filled"
          inputRef={firstNameRef}
        />
      </div>
      <div>
        <TextField
          required
          id="last-name"
          label="Last Name"
          variant="filled"
          inputRef={lastNameRef}
        />
      </div>

      <div>
        <TextField
          required
          id="email"
          label="Email"
          variant="filled"
          inputRef={emailRef}
        />
      </div>

      <Button color="secondary">Cancel</Button>
      <Button type="submit" color="primary">
        Add User
      </Button>
    </form>
  );
};

export default AddUser;
