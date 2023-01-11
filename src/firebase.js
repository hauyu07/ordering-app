import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  getDoc,
  collection,
  query,
  orderBy,
  where,
  addDoc,
  onSnapshot,
  limit,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1q88oOXYuXjxEleY1ggMewthRy_8dk_s",
  authDomain: "ordering-app-dev.firebaseapp.com",
  projectId: "ordering-app-dev",
  storageBucket: "ordering-app-dev.appspot.com",
  messagingSenderId: "759794679946",
  appId: "1:759794679946:web:018b161b3f63ec80b7ad73",
  measurementId: "G-QHGQZ1Q072",
};

//**** Initialize Firebase ****//
const app = initializeApp(firebaseConfig);
const firestore = getFirestore();

//****  add document to orderedItems  ****//
export async function addOrderedItems(orderedItem, name) {
  const newOrderedItem = doc(firestore, "orderedItems", name);
  try {
    await setDoc(newOrderedItem, orderedItem, { merge: true });
  } catch (error) {
    console.log("error");
  }
}

//**** get dishes from catgegory ****//
export async function queryforDishes(tabName) {
  const dishesQuery = query(
    collection(firestore, tabName),
    orderBy("id"),
    limit(10)
  );
  const querySnapshot = await getDocs(dishesQuery);
  return querySnapshot;
}

//**** get category from menu *****//
export async function queryforCategory() {
  const categoryQuery = query(
    collection(firestore, "category"),
    orderBy("id"),
    limit(10)
  );
  const querySnapshot = await getDocs(categoryQuery);
  return querySnapshot;
}

//**** get ordered items *****//
export async function queryforOrderedItems() {
  const orderedItemsQuery = query(collection(firestore, "orderedItems"));
  const querySnapshot = await getDocs(orderedItemsQuery);
  return querySnapshot;
}

//TEMPLATES//

//const appetizers = doc(firestore, "appetizers/3");

// async function writeAppetizers() {
//   const docData = {
//     id: "3",
//     name: "BBQ meatballs",
//   };
//   try {
//     await setDoc(appetizers, docData, { merge: true });
//     console.log("written!");
//   } catch (error) {
//     console.log("error");
//   }
// }

// const orderedItems = doc(firestore, "orderedItems/1");

// export async function addOrderedItems(orderedItem) {
//   try {
//     await setDoc(orderedItems, orderedItem, { merge: true });
//     console.log("written!");
//   } catch (error) {
//     console.log("error");
//   }
// }

// const appetizersCollection = collection(firestore, "appetizers");

// async function addNewDoc() {
//   const newDoc = await addDoc(appetizersCollection, {
//     customer: "Arthur",
//     drink: "Latte",
//   });
// }

// async function readSingleDoc() {
//   const mySnapshot = await getDoc(appetizers);
//   if (mySnapshot.exists()) {
//     const docData = mySnapshot.data();
//     console.log(`${JSON.stringify(docData)}`);
//   }
// }

// let dailySpecialUnsubscribe;

// function listenToDocument() {
//   dailySpecialUnsubscribe = onSnapshot(appetizers, (docSnapshot) => {
//     if (docSnapshot.exists()) {
//       const docData = docSnapshot.data();
//       console.log(`realtime: ${JSON.stringify(docData)}`);
//     }
//   });
// }

// function cancelMyListenerAtAppropriateTime() {
//   dailySpecialUnsubscribe();
// }

//writeAppetizers();
//addNewDoc();
//readSingleDoc();
//listenToDocument();
//queryforDishes();
