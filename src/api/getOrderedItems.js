// import { queryforOrderedItems } from "../firebase";

// export async function getOrderedItems(setOrderedItems) {
//   let tempArray = [];

//   await queryforOrderedItems().then((res) => {
//     res.forEach((snap) => {
//       tempArray = tempArray.concat(snap.data());
//     });
//     setOrderedItems(tempArray);
//   });
// }

export default async function getOrderedItems(token, type, id) {
  if (type == "customer") {
    return await (
      await fetch(
        `https://restaurantpos-prod-api.azurewebsites.net/customers/${id}/orders`
      )
    ).json();
  } else {
    return await (
      await fetch("https://restaurantpos-prod-api.azurewebsites.net/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();
  }
}
