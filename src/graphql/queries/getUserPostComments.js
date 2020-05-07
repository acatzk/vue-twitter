import gql from 'graphql-tag'

export const GET_USER_POST_COMMENTS = gql`
query getUserPostComments($post_id: uuid!) {
    comments(where: {post_id: {_eq: $post_id}}, order_by: {created_at: desc}) {
      id
      user_id
      message
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

export const GET_COMMENT_COUNT = gql`
query getUserPostCommentCount($post_id: uuid!) {
    comments_aggregate(where: {post_id: {_eq: $post_id}}, order_by: {created_at: desc}) {
      aggregate {
        count
      }
    }
  }  
`