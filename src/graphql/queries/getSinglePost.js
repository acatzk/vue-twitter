import gql from 'graphql-tag'

export const GET_SINGLE_USER_POST = gql`
query getUserPost($id: uuid!) {
    posts(where: {id: {_eq: $id}}) {
      id
      user_id
      caption
      imageUrl
      likes
      created_at
      user {
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
  }  
`