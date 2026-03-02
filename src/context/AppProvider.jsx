import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";

const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [assignement, setAssignments] = useState([]);
  const [libary, setLibary] = useState([]);

  const [theme,setTheme] = useState('light');

  const toggoleTheme = () =>{
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    if(theme === 'dark'){
        document.documentElement.classList.add("dark");
    }else{
        document.documentElement.classList.remove("dark");

    }
  }, [theme])

  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch("/assignments.json")
      .then((res) => res.json())
      .then((data) => setAssignments(data));

    fetch("/teacher.json")
      .then((res) => res.json())
      .then((data) => setTeachers(data));

    fetch("/libary.json")
      .then((res) => res.json())
      .then((data) => setLibary(data));
  }, []);


  return (
    <AppContext.Provider
      value={{ users, teachers, setAssignments, assignement, libary, theme, toggoleTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
