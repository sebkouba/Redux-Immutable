import Firebase from 'firebase'

const firebaseUrl = 'https://duckr.firebaseio.com/'
export const ref = new Firebase(firebaseUrl)

export const repliesExpirationLength = 300000