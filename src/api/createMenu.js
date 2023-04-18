export default async function createMenu(menu, token) {
  return await await fetch(
    "https://restaurantpos-prod-api.azurewebsites.net/menus",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu),
    }
  );
}
