import gql from 'graphql-tag'

export const GET_USERS_FOLLOWING_POSTS_SUBSCRIPTION = gql`
query getUsersFollowingPosts($follower_id: String!) {
    follow(where: {follower_id: {_eq: $follower_id}}) {
      id
      user {
        id
        posts(order_by: {created_at: desc}) {
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
    }
  }
  
`