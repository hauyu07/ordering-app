export default async function createOrder(token, id, type, body) {
  if (type == "customer") {
    return await fetch(
      `https://restaurantpos-prod-api.azurewebsites.net/customers/${id}/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  } else {
    return (
      await fetch(
        `https://restaurantpos-prod-api.azurewebsites.net/menus/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
    ).json();
  }
}
