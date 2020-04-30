import gql from 'graphql-tag'

export const SIGNUP_USER_MUTATION = gql`
mutation ($id: String!, $firstname: String!, $lastname: String!, $username: String!, $email: String!, $password: String!) {
    insert_users(objects: [{id: $id, firstname: $firstname, lastname: $lastname, username: $username, email: $email, password: $password}]) {
      returning {
        id
        firstname
        lastname
      }
    }
  }  
`