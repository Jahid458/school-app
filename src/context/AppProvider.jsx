import React, { useEffect, useState } from 'react'
import { AppContext } from './AppContext';


const AppProvider = ({children}) => {

    const [users,setUsers ] = useState([]);
    const [teachers,setTeachers ] = useState([]);
    const [assignement, setAssignments] = useState([]);
    const [libary,setLibary] = useState([])

    useEffect(()=>{
        fetch('/users.json')
        .then(res => res.json())
        .then(data => setUsers(data))
    },[])
    useEffect(()=>{
        fetch('/teacher.json')
        .then(res => res.json())
        .then(data => setTeachers(data))
    },[])

    useEffect(() => {
        fetch('/assignments.json')
         .then( res => res.json())
         .then(data => setAssignments(data))
    },[])

    useEffect(()=>{
        fetch('/libary.json')
        .then(res => res.json())
        .then( data => setLibary(data))
    },[])

  return (
    <AppContext.Provider value={{users,teachers,setAssignments, assignement, libary}}>
        {children}
    </AppContext.Provider>
  )
}

export default AppProvider