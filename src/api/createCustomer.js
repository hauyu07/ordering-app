export default async function createCustomer(table, headCount, token) {
  return await fetch(
    "https://restaurantpos-prod-api.azurewebsites.net/customers",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        tableNumber: table,
        headCount: headCount,
      }),
    }
  );
}
