import { createSlice } from "@reduxjs/toolkit";
import { getDate } from "../util-functions";

// Extract year, month, and day

// Format into yyyy-mm-dd
const INITIAL_STATE = {
  comList: [
    {
      price: "100",
      description:
        "Suzuran, an ethereally captivating arcanist from the mystical enclave of Eclipsia stands at 5'7 with midnight-blue hair, violet eyes, and an aura of tranquil elegance. Clad in an intricately designed navy-blue qipao, complemented by an azure cloak and a silver pendant, she wields the slim crystal staff Moonlit Serenity and carries a pouch of magical charms.",
      date: getDate(4),
      added: getDate(0),
      status: "Completed",
      source: "pixiv",
      name: "Bob",
      id: "01",
      refImage: [
        "https://t3.ftcdn.net/jpg/05/56/38/38/360_F_556383860_pVMr2MpKfOPa2tQZiysUatpqhWm6AXaB.jpg",
        "https://t4.ftcdn.net/jpg/05/69/84/67/360_F_569846700_i3o9u2fhPVVq7iJAzkqMqCwjWSyv53tT.jpg",
        "https://static.displate.com/280x392/displate/2023-03-23/b8671ef5b9a5fdfedaf2bd72dfeaecd1_d23290dc9e5a5deede4abfdfb6e08f91.jpg",
        "https://t4.ftcdn.net/jpg/05/69/84/67/360_F_569846700_i3o9u2fhPVVq7iJAzkqMqCwjWSyv53tT.jpg",
        "https://t4.ftcdn.net/jpg/05/69/84/67/360_F_569846700_i3o9u2fhPVVq7iJAzkqMqCwjWSyv53tT.jpg",
        "https://t4.ftcdn.net/jpg/05/69/84/67/360_F_569846700_i3o9u2fhPVVq7iJAzkqMqCwjWSyv53tT.jpg",
      ],
    },
    {
      price: "200",
      description:
        "Suzuran, an ethereally captivating arcanist from the mystical enclave of Eclipsia stands at 5'7 with midnight-blue hair, violet eyes, and an aura of tranquil elegance. Clad in an intricately designed navy-blue qipao, complemented by an azure cloak and a silver pendant, she wields the slim crystal staff Moonlit Serenity and carries a pouch of magical charms.",
        date: getDate(6),
        added: getDate(-1),
      status: "Declined",
      source: "skeb",
      name: "Jess",
      id: "02",
      refImage: [
        "https://t3.ftcdn.net/jpg/05/56/38/38/360_F_556383860_pVMr2MpKfOPa2tQZiysUatpqhWm6AXaB.jpg",
        "https://t4.ftcdn.net/jpg/05/69/84/67/360_F_569846700_i3o9u2fhPVVq7iJAzkqMqCwjWSyv53tT.jpg",
      ],
    },
    {
      price: "80",
      description:
        "Suzuran, an ethereally captivating arcanist from the mystical enclave of Eclipsia stands at 5'7 with midnight-blue hair, violet eyes, and an aura of tranquil elegance. Clad in an intricately designed navy-blue qipao, complemented by an azure cloak and a silver pendant, she wields the slim crystal staff Moonlit Serenity and carries a pouch of magical charms.",
        date: getDate(7),
        added: getDate(0),
      source: "mail",
      name: "Cat",
      id: "03",
      refImage: [
        "https://t3.ftcdn.net/jpg/05/56/38/38/360_F_556383860_pVMr2MpKfOPa2tQZiysUatpqhWm6AXaB.jpg",
        "https://t4.ftcdn.net/jpg/05/69/84/67/360_F_569846700_i3o9u2fhPVVq7iJAzkqMqCwjWSyv53tT.jpg",
        "https://static.displate.com/280x392/displate/2023-03-23/b8671ef5b9a5fdfedaf2bd72dfeaecd1_d23290dc9e5a5deede4abfdfb6e08f91.jpg",
      ],
    },
    {
      price: "180",
      description:
        "Suzuran, an ethereally captivating arcanist from the mystical enclave of Eclipsia stands at 5'7 with midnight-blue hair, violet eyes, and an aura of tranquil elegance. Clad in an intricately designed navy-blue qipao, complemented by an azure cloak and a silver pendant, she wields the slim crystal staff Moonlit Serenity and carries a pouch of magical charms.",
        date: getDate(2),
        added: getDate(0),
      status: "Accepted/WIP",
      source: "other",
      name: "Tat",
      id: "04",
      refImage: [
        "https://t3.ftcdn.net/jpg/05/56/38/38/360_F_556383860_pVMr2MpKfOPa2tQZiysUatpqhWm6AXaB.jpg",
      ],
    },
    {
      price: "1280",
      description:
        "Suzuran, an ethereally captivating arcanist from the mystical enclave of Eclipsia stands at 5'7 with midnight-blue hair, violet eyes, and an aura of tranquil elegance. Clad in an intricately designed navy-blue qipao, complemented by an azure cloak and a silver pendant, she wields the slim crystal staff Moonlit Serenity and carries a pouch of magical charms.",
        date: getDate(1),
        added: getDate(-2),
      status: "Accepted/WIP",
      source: "skeb",
      name: "Mat",
      id: "05",
      refImage: [],
    },
  ],
};

export const comSlice = createSlice({
  name: "coms",
  initialState: INITIAL_STATE,
  reducers: {
    addCommissionToList: (state, action) => {
      state.comList = [...state.comList, action.payload];
    },

    removeCommissionFromList: (state, action) => {
      // tasks in id of comission to remove as payload
      const newList = HELPER_removeComFromList(state.comList, action.payload);
      state.comList = newList;
    },

    changeStatusToComplete: (state, action) => {
      const newList = HELPER_changeToComplete(state.comList, action.payload);
      state.comList = newList;
    },
  },
});

//helper functions
const HELPER_removeComFromList = (currentList, idOfCommission) => {
  return currentList.filter((com) => com.id !== idOfCommission);
};

const HELPER_changeToComplete = (currentList, idOfCommission) => {
  return currentList.map((item) =>
    item.id === idOfCommission ? { ...item, status: "Completed" } : item
  );
};

export const {
  addCommissionToList,
  removeCommissionFromList,
  changeStatusToComplete,
} = comSlice.actions;
export const comReducer = comSlice.reducer;
export const selectComList = (state) => state.coms.comList;
