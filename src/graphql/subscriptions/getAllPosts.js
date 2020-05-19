import gql from 'graphql-tag'

export const GET_ALL_POSTS_SUBSCRIPTION = gql`
subscription getAllPostsSubscription {
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
`