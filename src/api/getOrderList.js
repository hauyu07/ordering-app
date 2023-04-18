export default async function getOrderList(token) {
  return await (
    await fetch("https://restaurantpos-prod-api.azurewebsites.net/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
}
