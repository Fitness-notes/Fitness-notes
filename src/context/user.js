import React, { useState, useMemo } from "react";
import { exercisesServices } from "../services/firestore";
import dataFormatHelper from "../helpers/dataFormat";

export const UserDataContext = React.createContext();
export default function UserContext({ children }) {
  const [userData, setUserData] = useState(null);


  const toggleRefreshData = async () => {
    let data = await exercisesServices.getUserData(userData.id);
    if (!data) return;
    setUserData(data);
  };
  const formatedExercises = useMemo(() => {
    if (!userData) return [];
    let formatObj =  dataFormatHelper.groupByCategory(userData.exercises);
    return Object.keys(formatObj).map((key) => ({
      category: key,
      exercises: formatObj[key],
    }));
  }, [userData]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData, toggleRefreshData, formatedExercises }}>
      {children}
    </UserDataContext.Provider>
  );
}
