import gql from 'graphql-tag'

export const DELETE_POST_MUTATION = gql`
mutation ($post_id: uuid!) {
    delete_react(where: {post_id: {_eq: $post_id}}) {
      returning {
        id
      }
    }
    delete_comments(where: {post_id: {_eq: $post_id}}) {
      returning {
        id
      }
    }
    delete_posts(where: {id: {_eq: $post_id}}) {
      returning {
        id
      }
    }
  }  
`