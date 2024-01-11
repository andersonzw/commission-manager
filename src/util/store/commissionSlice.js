import { createSlice } from "@reduxjs/toolkit";

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
    },
    {
      price: "200",
      description:
        "Suzuran, an ethereally captivating arcanist from the mystical enclave of Eclipsia stands at 5'7 with midnight-blue hair, violet eyes, and an aura of tranquil elegance. Clad in an intricately designed navy-blue qipao, complemented by an azure cloak and a silver pendant, she wields the slim crystal staff Moonlit Serenity and carries a pouch of magical charms.",
      date: "2023-11-21",
      status: "Completed",
      source: "",
      name: "Jess",
    },
    {
      price: "80",
      description:
        "Suzuran, an ethereally captivating arcanist from the mystical enclave of Eclipsia stands at 5'7 with midnight-blue hair, violet eyes, and an aura of tranquil elegance. Clad in an intricately designed navy-blue qipao, complemented by an azure cloak and a silver pendant, she wields the slim crystal staff Moonlit Serenity and carries a pouch of magical charms.",
      date: "2023-12-20",
      status: "Completed",
      source: "",
      name: "Cat",
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
  },
});

export const { addCommissionToList } = comSlice.actions;
export const comReducer = comSlice.reducer;
export const selectComList = (state) => state.coms.comList;
