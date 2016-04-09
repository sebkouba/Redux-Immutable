import Firebase from 'firebase'

const firebaseUrl = 'https://duckr.firebaseio.com/'
export const ref = new Firebase(firebaseUrl)

export const usersDucksExpirationLength = 100000
export const userExpirationLength = 100000