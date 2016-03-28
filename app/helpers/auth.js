import { ref } from 'config/constants'

export default function auth () {
  return ref.authWithOAuthPopup('facebook')
}

export function logout () {
  ref.unauth()
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}`).set(user)
}