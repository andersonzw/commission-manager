
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