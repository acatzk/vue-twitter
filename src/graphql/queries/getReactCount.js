import gql from 'graphql-tag'

export const GET_REACT_COUNT = gql`
query getReactCount($post_id: uuid!) {
  react_aggregate(where: {post_id: {_eq: $post_id}}, order_by: {created_at: desc}) {
    aggregate {
      count
    }
    nodes {
      user {
        id
        firstname
        lastname
      }
    }
  }
}
`