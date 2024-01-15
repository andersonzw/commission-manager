import { createSlice } from "@reduxjs/toolkit";
const currentDate = new Date();
const futureDate = new Date(currentDate);
futureDate.setMonth(currentDate.getMonth() + 1);
const INITIAL_STATE = {
  comList: [
    {
      price: "100",
      description:
        "Suzuran, an ethereally captivating arcanist from the mystical enclave of Eclipsia stands at 5'7 with midnight-blue hair, violet eyes, and an aura of tranquil elegance. Clad in an intricately designed navy-blue qipao, complemented by an azure cloak and a silver pendant, she wields the slim crystal staff Moonlit Serenity and carries a pouch of magical charms.",
      date: "2023-11-20",
      status: "Completed",
      source: "",
      name: "Bob",
      id: "01",
      refImage: [
        "https://t3.ftcdn.net/jpg/05/56/38/38/360_F_556383860_pVMr2MpKfOPa2tQZiysUatpqhWm6AXaB.jpg",
        "https://t4.ftcdn.net/jpg/05/69/84/67/360_F_569846700_i3o9u2fhPVVq7iJAzkqMqCwjWSyv53tT.jpg",
      ],
    },
    {
      price: "200",
      description:
        "Suzuran, an ethereally captivating arcanist from the mystical enclave of Eclipsia stands at 5'7 with midnight-blue hair, violet eyes, and an aura of tranquil elegance. Clad in an intricately designed navy-blue qipao, complemented by an azure cloak and a silver pendant, she wields the slim crystal staff Moonlit Serenity and carries a pouch of magical charms.",
      date: "2023-11-20",
      status: "Declined",
      source: "",
      name: "Jess",
      id: "02",
      refImage:[],
    },
    {
      price: "80",
      description:
        "Suzuran, an ethereally captivating arcanist from the mystical enclave of Eclipsia stands at 5'7 with midnight-blue hair, violet eyes, and an aura of tranquil elegance. Clad in an intricately designed navy-blue qipao, complemented by an azure cloak and a silver pendant, she wields the slim crystal staff Moonlit Serenity and carries a pouch of magical charms.",
      date: "2023-12-20",
      status: "Accepted/WIP",
      source: "",
      name: "Cat",
      id: "03",
      refImage:[],
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
