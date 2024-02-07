import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase/firebase.utils";

export const getDate = (future) => {
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setMonth(currentDate.getMonth() + future);
  const year = futureDate.getFullYear();
  const month = String(futureDate.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
  const day = String(futureDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const generateUniqueID = () => {
  // Get the current time in milliseconds
  const currentTime = new Date().getTime();

  // Extract the last 6 digits from the current time
  const last6Digits = currentTime.toString().slice(-6);

  // Return the generated ID
  return last6Digits;
};

// fetch and dispatch commission list to store
export const fetchList = async (userId) => {
  if (!userId) return;
  const q = query(collection(db, `users/${userId}/commissionList`));
  try {
    const querySnapshot = await getDocs(q);
    const comList = querySnapshot.docs.map((doc) => doc.data());
    return comList;
  } catch (e) {
    console.error("Error fetching todo lists: ", e);
    return [];
  }
};

// fetch and dispatch commission list to store
export const fetchCommissionFromList = async (userId, comId) => {
  if (!userId || !comId) return;
  const q = query(collection(db, `users/${userId}/commissionList`));
  try {
    const querySnapshot = await getDocs(q);
    const comList = querySnapshot.docs.map((doc) => doc.data());
    const commission = comList.filter((com) => com.id === comId);
    console.log("fetched successfully");
    return commission[0];
  } catch (e) {
    console.error("Error fetching todo lists: ", e);
    return [];
  }
};
