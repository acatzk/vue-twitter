import gql from 'graphql-tag'

export const UPDATE_USER_FULLNAME_MUTATION = gql`
mutation updateUserFullname($id: String, $firstname: String, $lastname: String) {
    update_users(_set: {firstname: $firstname, lastname: $lastname}, where: {id: {_eq: $id}}) {
      returning {
        id
        firstname
        lastname
      }
    }
  }
`

export const INSERT_USER_PROFILE_MUTATION = gql`
mutation insertUserProfile($user_id: String, $bio: String, $avatarUrl: String, $website: String, $birthdate: String, $location: String) {
  insert_profile(objects: [{user_id: $user_id, bio: $bio, avatarUrl: $avatarUrl, website: $website, birthdate: $birthdate, location: $location}]) {
    returning {
      id
      user_id
      bio
      avatarUrl
      website
      location
    }
  }
}
`

export const UPDATE_USER_PROFILE_MUTATION = gql`
mutation updateUserProfile($user_id: String, $bio: String, $avatarUrl: String, $website: String, $birthdate: String, $location: String) {
  update_profile(_set: { bio: $bio, avatarUrl: $avatarUrl, website: $website, birthdate: $birthdate, location: $location}, where: { user_id: { _eq: $user_id } }) {
    returning {
      id
      user_id
      bio
      avatarUrl
      website
      birthdate
      location
    }
  }
}
`