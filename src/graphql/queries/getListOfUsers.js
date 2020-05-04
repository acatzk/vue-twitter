import gql from 'graphql-tag'

export const GET_LIST_OF_USERS_QUERY = gql`
query ($id: String!) {
    users(where: {id: {_neq: $id}}) {
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