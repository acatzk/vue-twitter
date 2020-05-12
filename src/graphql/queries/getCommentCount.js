import gql from 'graphql-tag'

export const GET_COMMENT_COUNT = gql`
subscription getCommentCount($post_id: uuid!) {
  comments_aggregate(where: {post_id: {_eq: $post_id}}, order_by: {created_at: desc}) {
    aggregate {
      count
    }
  }
}
`