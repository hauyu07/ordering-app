export default async function updateMenu(id, menu, token) {
  return await await fetch(
    `https://restaurantpos-prod-api.azurewebsites.net/menus/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu),
    }
  );
}
