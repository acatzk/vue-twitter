import gql from 'graphql-tag'

export const COMMENT_USER_MUTATION = gql`
mutation ($user_id: String!, $post_id: uuid!, $message: String!) {
    insert_comments(objects: [{user_id: $user_id, post_id: $post_id, message: $message}]) {
      returning {
        id
      }
    }
  }  
`