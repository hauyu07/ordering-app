export default async function signUp(username, restaurantName, token) {
  return await await fetch(
    "https://restaurantpos-prod-api.azurewebsites.net/auth/sign-up",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        restaurantName: restaurantName,
      }),
    }
  );
}
