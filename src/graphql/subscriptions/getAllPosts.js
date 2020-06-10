import gql from 'graphql-tag'

export const GET_ALL_POSTS_SUBSCRIPTION = gql`
subscription getAllPostsSubscription {
  posts(limit: 20, offset: 0, order_by: {created_at: desc}) {
    id
    imageUrl
    videoUrl
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