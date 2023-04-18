export default async function getMenu(token, id, type) {
  if (type == "customer") {
    return (
      await fetch(
        `https://restaurantpos-prod-api.azurewebsites.net/customers/${id}/menus/active`
      )
    ).json();
  } else {
    return (
      await fetch(
        `https://restaurantpos-prod-api.azurewebsites.net/menus/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    ).json();
  }
}
