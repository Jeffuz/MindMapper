export default async function IsUserAuthenticated() {

  const result = await fetch("/api/auth", {
    method: "GET"
  })
  .then(response => response.json())
  .then(data => data.body)
  .catch((e) => {
    console.log("error fetching authentication", e)
    return null
  });
  
  if (result === null || result === undefined)
    return false

  return true
  
}