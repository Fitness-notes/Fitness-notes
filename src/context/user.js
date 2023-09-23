import React, { useState } from "react";
import { exercisesServices } from "../services/firestore";

export const UserDataContext = React.createContext();
export default function UserContext({ children }) {
  const [userData, setUserData] = useState(null);

  const toggleRefreshData = async () => {
    let data = await exercisesServices.getUserData(userData.id);
    if (!data) return;
    setUserData(data);
  };
  return (
    <UserDataContext.Provider value={{ userData, setUserData, toggleRefreshData }}>
      {children}
    </UserDataContext.Provider>
  );
}
