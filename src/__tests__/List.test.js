import React from 'react';
import ReactDOM from 'react-dom';
import List from '../components/shared/List';
import renderer from 'react-test-renderer';
import UserList from '../components/Users/UserList';
const store = createStore(rootReducer);
import { createStore } from 'redux'
import rootReducer from '../redux/rootReducer'
import { Provider } from 'react-redux';

// test('renders "no items" when list is empty', () => {
//   // arrange
//   const container = document.createElement('div');

//   // act
//   ReactDOM.render(<List items={[]} />, container);

//   // assert
//   expect(container.textContent).toMatch('no items');
// });

test('users', () => {
  const users = [
    {
      "id": "1",
      "firstName": "firstName 1",
      "lastName": "lastName 1",
      "fullName": "fullName 1",
      "email": "123@gmail.com",
      "address": "address 1",
      "password": "123",
      "phone": 1234567890,
      "isDeleted": false,
      "roleId": "manager"
    },
    {
      "id": "2",
      "firstName": "firstName 2",
      "lastName": "lastName 2",
      "fullName": "fullName 2",
      "email": "456@gmail.com",
      "address": "address 2",
      "password": "456",
      "phone": 1234567890,
      "isDeleted": true,
      "roleId": "manager"
    },
    {
      "id": "3",
      "firstName": "firstName 3",
      "lastName": "lastName 3",
      "fullName": "fullName 3",
      "email": "def@gmail.com",
      "address": "address 3",
      "password": "def",
      "phone": 1234567890,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "4",
      "firstName": "firstName 4",
      "lastName": "lastName 4",
      "fullName": "fullName 4",
      "email": "email@gmail.com",
      "address": "address 4",
      "password": "email",
      "phone": 87,
      "isDeleted": true,
      "roleId": "member"
    },
    {
      "id": "5",
      "firstName": "firstName 5",
      "lastName": "lastName 5",
      "fullName": "fullName 5",
      "email": "admin@gmail.com",
      "address": "address 5",
      "password": "admin",
      "phone": 1235567890,
      "isDeleted": true,
      "roleId": "admin"
    },
    {
      "id": "6",
      "firstName": "firstName 6",
      "lastName": "lastName 6",
      "fullName": "fullName 6",
      "email": "admin1@gmail.com",
      "address": "address 6",
      "password": "admin1",
      "phone": 1235567890,
      "isDeleted": false,
      "roleId": "admin"
    },
    {
      "id": "7",
      "firstName": "firstName 7",
      "lastName": "lastName 7",
      "fullName": "fullName 7",
      "email": "admin2@gmail.com",
      "address": "address 5",
      "password": "admin2",
      "phone": 1235567890,
      "isDeleted": false,
      "roleId": "admin"
    },
    {
      "id": "8",
      "firstName": "firstName 8",
      "lastName": "lastName 8",
      "fullName": "fullName 8",
      "email": "admin3@gmail.com",
      "address": "address 8",
      "password": "admin3",
      "phone": 1235567890,
      "isDeleted": false,
      "roleId": "admin"
    },
    {
      "id": "9",
      "firstName": "nhan",
      "lastName": "nguyen",
      "fullName": "fullName 9",
      "email": "test@mail.com",
      "address": "address 9",
      "password": "123456",
      "phone": 47,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "10",
      "firstName": "test 1",
      "lastName": "last 1",
      "fullName": "fullName 10",
      "email": "test1@gmail.com",
      "address": "address 10",
      "password": "123456",
      "phone": 72,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "11",
      "firstName": "123",
      "lastName": "123",
      "fullName": "fullName 11",
      "email": "123@123.com",
      "address": "address 11",
      "password": "123456",
      "phone": 97,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "12",
      "firstName": "123",
      "lastName": "123",
      "fullName": "fullName 12",
      "email": "123@123.com",
      "address": "address 12",
      "password": "123456",
      "phone": 48,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "13",
      "firstName": "123",
      "lastName": "123",
      "fullName": "fullName 13",
      "email": "123@123.com",
      "address": "address 13",
      "password": "123456",
      "phone": 50,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "14",
      "firstName": "tientest",
      "lastName": "test",
      "fullName": "fullName 14",
      "email": "tientest@gmail.com",
      "address": "address 14",
      "password": "123456",
      "phone": 53,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "15",
      "firstName": "tientest",
      "lastName": "test",
      "fullName": "fullName 15",
      "email": "tientest@gmail.com",
      "address": "address 15",
      "password": "123456",
      "phone": 15,
      "isDeleted": false,
      "roleId": "member"
    }
  ];
  // arrange
   // act
  //  ReactDOM.render(
  //   <Provider store={store}>
  //   <UserList items={users} />
  //   </Provider>);

   // assert
   expect(users.length).toBe(15);
})
test('users test', () => {
  const users = [
    {
      "id": "1",
      "firstName": "firstName 1",
      "lastName": "lastName 1",
      "fullName": "fullName 1",
      "email": "123@gmail.com",
      "address": "address 1",
      "password": "123",
      "phone": 1234567890,
      "isDeleted": false,
      "roleId": "manager"
    },
    {
      "id": "2",
      "firstName": "firstName 2",
      "lastName": "lastName 2",
      "fullName": "fullName 2",
      "email": "456@gmail.com",
      "address": "address 2",
      "password": "456",
      "phone": 1234567890,
      "isDeleted": true,
      "roleId": "manager"
    },
    {
      "id": "3",
      "firstName": "firstName 3",
      "lastName": "lastName 3",
      "fullName": "fullName 3",
      "email": "def@gmail.com",
      "address": "address 3",
      "password": "def",
      "phone": 1234567890,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "4",
      "firstName": "firstName 4",
      "lastName": "lastName 4",
      "fullName": "fullName 4",
      "email": "email@gmail.com",
      "address": "address 4",
      "password": "email",
      "phone": 87,
      "isDeleted": true,
      "roleId": "member"
    },
    {
      "id": "5",
      "firstName": "firstName 5",
      "lastName": "lastName 5",
      "fullName": "fullName 5",
      "email": "admin@gmail.com",
      "address": "address 5",
      "password": "admin",
      "phone": 1235567890,
      "isDeleted": true,
      "roleId": "admin"
    },
    {
      "id": "6",
      "firstName": "firstName 6",
      "lastName": "lastName 6",
      "fullName": "fullName 6",
      "email": "admin1@gmail.com",
      "address": "address 6",
      "password": "admin1",
      "phone": 1235567890,
      "isDeleted": false,
      "roleId": "admin"
    },
    {
      "id": "7",
      "firstName": "firstName 7",
      "lastName": "lastName 7",
      "fullName": "fullName 7",
      "email": "admin2@gmail.com",
      "address": "address 5",
      "password": "admin2",
      "phone": 1235567890,
      "isDeleted": false,
      "roleId": "admin"
    },
    {
      "id": "8",
      "firstName": "firstName 8",
      "lastName": "lastName 8",
      "fullName": "fullName 8",
      "email": "admin3@gmail.com",
      "address": "address 8",
      "password": "admin3",
      "phone": 1235567890,
      "isDeleted": false,
      "roleId": "admin"
    },
    {
      "id": "9",
      "firstName": "nhan",
      "lastName": "nguyen",
      "fullName": "fullName 9",
      "email": "test@mail.com",
      "address": "address 9",
      "password": "123456",
      "phone": 47,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "10",
      "firstName": "test 1",
      "lastName": "last 1",
      "fullName": "fullName 10",
      "email": "test1@gmail.com",
      "address": "address 10",
      "password": "123456",
      "phone": 72,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "11",
      "firstName": "123",
      "lastName": "123",
      "fullName": "fullName 11",
      "email": "123@123.com",
      "address": "address 11",
      "password": "123456",
      "phone": 97,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "12",
      "firstName": "123",
      "lastName": "123",
      "fullName": "fullName 12",
      "email": "123@123.com",
      "address": "address 12",
      "password": "123456",
      "phone": 48,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "13",
      "firstName": "123",
      "lastName": "123",
      "fullName": "fullName 13",
      "email": "123@123.com",
      "address": "address 13",
      "password": "123456",
      "phone": 50,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "14",
      "firstName": "tientest",
      "lastName": "test",
      "fullName": "fullName 14",
      "email": "tientest@gmail.com",
      "address": "address 14",
      "password": "123456",
      "phone": 53,
      "isDeleted": false,
      "roleId": "member"
    },
    {
      "id": "15",
      "firstName": "tientest",
      "lastName": "test",
      "fullName": "fullName 15",
      "email": "tientest@gmail.com",
      "address": "address 15",
      "password": "123456",
      "phone": 15,
      "isDeleted": false,
      "roleId": "member"
    }
  ];
   // act
   const selectedIds =[1, 2]
  const component = renderer.create(
    <Provider store={store}>
    <UserList users={users} selectedIds={selectedIds}/>
    </Provider>);
    let json = component.toJSON();
   // assert
   expect(json).toMatchSnapshot();
})