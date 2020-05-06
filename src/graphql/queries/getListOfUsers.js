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