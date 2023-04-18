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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getIdToken,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { Await, useNavigate, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

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
const auth = getAuth(app);

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

//**** create user ****//

export function updateUser(username) {
  updateProfile(auth.currentUser, {
    displayName: username,
  })
    .then(() => {
      console.log("User Updated");
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
}

export const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName: name, accessToken: token } = user;
        setUser({
          uid,
          name,
          token,
        });
      }
      setIsLoading(false);
    });
  }, []);

  const createUser = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    }
  };

  const loginUser = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);

      // const { user } = await signInWithEmailAndPassword(auth, email, password);
      // return user;
    } catch (error) {
      console.log(error);
    }
  };

  const value = { createUser, loginUser, user };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};

// export async function loginUser(email, password) {
//   try {
//     const { user } = await signInWithEmailAndPassword(auth, email, password);
//     return user;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function checkState() {
//   return await onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;
//       const token = await getIdToken(user);
//       console.log(uid, token);
//       return token;
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }
//   });
// }

export function logout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
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
