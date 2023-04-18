export default async function getMenuList(token) {
  return await (
    await fetch("https://restaurantpos-prod-api.azurewebsites.net/menus", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
}
