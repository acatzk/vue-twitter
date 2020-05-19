import gql from 'graphql-tag'

export const DELETE_POST_MUTATION = gql`
mutation ($post_id: uuid!) {
    delete_posts(where: {id: {_eq: $post_id}}) {
        returning {
            id
        }
    }
}
`