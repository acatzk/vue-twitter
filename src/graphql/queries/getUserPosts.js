import gql from 'graphql-tag'

export const GET_USER_POSTS = gql`
query getUserPosts($user_id: String!) {
  posts(where: {user_id: {_eq: $user_id}}, order_by: {created_at: desc}) {
    id
    imageUrl
    caption
    user_id
    created_at
    likes
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
    comments_aggregate {
      aggregate { 
        count
      }
    }
  }
}  
`