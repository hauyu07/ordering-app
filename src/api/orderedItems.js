import { queryforOrderedItems } from "../firebase";

export async function getOrderedItems(setOrderedItems) {
  let tempArray = [];

  await queryforOrderedItems().then((res) => {
    res.forEach((snap) => {
      tempArray = tempArray.concat(snap.data());
    });
    setOrderedItems(tempArray);
  });
}
