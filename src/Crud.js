import React, { useState, useEffect } from 'react';
import './App.css';

import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc,doc} from 'firebase/firestore';

export default function Crud(){

    const [newName, setNewName] = useState("");
    const[newAge, setNewAge] = useState(0);
    const [id, setId] = useState('');
    const[users, setUsers] = useState([]);
 
    const usersCollectionRef = collection(db, 'users');
    const[show, setShow] = useState(false);
 

   
     useEffect(() => {
     
      const getUsers = async () => {
        const data = await getDocs(usersCollectionRef)
        //console.log(data);
       setUsers(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        
      };
      
        getUsers();
        
      },[newName, newAge, users]);

    const createUser = async (e) =>{
      e.preventDefault();
        await addDoc(usersCollectionRef, {name: newName, age: Number(newAge) });
        setNewAge(0);
        setNewName("");
      
       
      
      };
      
      const updateUser = async() =>{
      
       const userDoc = doc (db, "users", id);
        const newFields = { name: newName, age: Number(newAge) };
        await updateDoc(userDoc, newFields);
        setShow(false);
        setNewName("");
        setNewAge(0);
     
      
      }
     
      
      const deleteUser = async(id) =>{
     
        const userDoc = doc (db, "users", id);
        await deleteDoc(userDoc);
      }

      const editUser = async(id, name,age)=>{
     
        setNewName(name);
        setNewAge(age);
        setId(id);
        setShow(true);
      }
      
     
      
        return (
          <div className="App">
            <h3 className='headtitle'>Enter Name and Age for <span>CRUD</span> </h3>
            <div className="App-header">
            <input placeholder='Enter Name' value={newName}
            onChange={(event) => {setNewName(event.target.value)}} />
      
            <input placeholder='Enter Age' value={newAge} type='number' 
            onChange={(event) => {setNewAge(event.target.value)}} />
           
           {!show? <button className='createbtn' onClick={createUser} >CREATE</button>:
           <button className='updatebtn' onClick={updateUser} >UPDATE</button>
            
            }



            
            </div>
            <div className="App-body">
            {users.map((user) =>(
               <div key={user.id}>
                {""}
                <div className="name_div">
                <h3>Name: {user.name} </h3>
                
                <h3>Age: {user.age} </h3>
        
                </div>
               
                <button className='editbtn' onClick={() => {editUser(user.id, user.name, user.age)}}> EDIT </button>
                <button className='deletebtn' onClick={() => {deleteUser(user.id)}}>DELETE</button>
               
                
                
            
              </div>
                      
            )
            
            )}
      
              </div>
      
          
           
          </div>
        );
    
}