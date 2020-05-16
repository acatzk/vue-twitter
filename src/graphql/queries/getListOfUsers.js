import gql from 'graphql-tag'

export const GET_LIST_OF_USERS_QUERY = gql`
query ($id: String!) {
  users(where: {id: {_neq: $id}}, order_by: { created_at: desc }) {
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
export const GET_ALL_USERS_SEARCH_QUERY = gql`
query {
  users(order_by: { created_at: asc }) {
    id
    firstname
    lastname
    username
    profile {
      id
      avatarUrl
    }
  }
}
`