import React, { useState, useEffect } from "react";
import UserContext from "./src/context/user";
import Main from "./src/Main";

export default function App() {
  return (
    <UserContext>
      <Main />
    </UserContext>
  );
}
