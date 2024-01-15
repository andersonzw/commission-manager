import { persistor } from "./store";

const resetPersistedState = () => {
  persistor.purge(); // This will force reset the persisted state
};

export default resetPersistedState;