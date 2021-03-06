import gql from 'graphql-tag'

export const GET_CURRENT_USER_QUERY = gql`
query getUser ($id: String!) {
    users(where: {id: {_eq: $id}}) {
      id
      firstname
      lastname
      email
      username
      password
      profile {
        id
        avatarUrl
      }
    }
  }  
`