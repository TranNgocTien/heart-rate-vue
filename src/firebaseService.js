import {
  ref,
  get,
  child,
  query,
  limitToLast,
  orderByKey,
  onValue,
} from "firebase/database";
import { database } from "./firebaseConfig";

export const getData = async (path) => {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, path));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
export const getLastTenEntries = async (path) => {
  try {
    const dbRef = ref(database, path);
    const lastTenQuery = query(dbRef, orderByKey(), limitToLast(10));
    const snapshot = await get(lastTenQuery);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
export const getLastoneEntries = async (path) => {
  try {
    const dbRef = ref(database, path);
    const lastTenQuery = query(dbRef, orderByKey(), limitToLast(1));
    const snapshot = await get(lastTenQuery);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

export const listenForLastTenEntries = (path, callback) => {
  const dbRef = ref(database, path);

  // Query to get last ten entries by key (assuming each entry has a unique key)
  const lastTenQuery = query(dbRef, orderByKey(), limitToLast(10));

  // Subscribe to 'value' event which triggers whenever data changes
  onValue(lastTenQuery, (snapshot) => {
    const entries = [];
    snapshot.forEach((childSnapshot) => {
      entries.unshift(childSnapshot.val()); // Add each entry to the beginning of the array
    });
    callback(entries); // Invoke callback function with last ten entries
  });
};

export const listenForLastEntry = (path, callback) => {
  const dbRef = ref(database, path);

  // Query to get the last entry by key (assuming each entry has a unique key)
  const lastEntryQuery = query(dbRef, orderByKey(), limitToLast(1));

  // Subscribe to 'value' event which triggers whenever data changes
  onValue(lastEntryQuery, (snapshot) => {
    if (snapshot.exists()) {
      const lastEntry = snapshot.val();
      callback(lastEntry); // Invoke callback function with the last entry
    } else {
      console.log("No data available");
    }
  });
};
