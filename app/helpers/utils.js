export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return (date.getMonth() + 1) + '/' + date.getFullYear()
}
