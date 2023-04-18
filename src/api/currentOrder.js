export default async function currentOrder() {
  return await (
    await fetch("https://restaurantpos-prod-api.azurewebsites.net/orders")
  ).json();
}
