import { persistor } from "./store";

const resetPersistedState = () => {
  persistor.purge(); // This will force reset the persisted state
  console.log("state purged");
};

export default resetPersistedState;