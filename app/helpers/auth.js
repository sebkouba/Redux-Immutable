import { ref } from 'config/constants'
import { fetchingUserSuccess, authUser } from 'redux/modules/users'
import { formatUserInfo } from 'helpers/utils'

export default function auth () {
  return ref.authWithOAuthPopup('facebook')
}

export function logout () {
  ref.unauth()
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}`).set(user)
}

export function checkIfAuthed (store) {
  const authData = ref.getAuth()
  if (authData === null) {
    return false
  } else {
    const { facebook, uid } = authData
    const userInfo = formatUserInfo(facebook.displayName, facebook.profileImageURL, uid)
    store.dispatch(authUser(uid))
    store.dispatch(fetchingUserSuccess(uid, userInfo, Date.now()))
    // If ^ is common, you can use https://github.com/tshelburne/redux-batched-actions
    return true
  }
}
