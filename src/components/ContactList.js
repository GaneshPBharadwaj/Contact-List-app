   import React, { useEffect } from "react";
   import { BrowserRouter, Route, Routes } from "react-router-dom";
   import { useDispatch } from "react-redux";
   import { ToastContainer } from "react-toastify";

   import Navbar from "./Navbar";
   import Home from "./Home";
   import AddContact from "./AddContact";
   import EditContact from "./EditContact";

   const ContactList = () => {
      const dispatch = useDispatch();
   useEffect(() => {
      const data = [];
      const fetchData = async () => {
         try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users/");
            const json = await response.json();
            json.forEach((contact) => {
               data.push({
                  id: contact.id,
                  name: contact.name,
                  number: contact.phone,
                  email: contact.email,
               });
            });
            dispatch({ type: "FETCH_CONTACTS", payload: data });
         } catch (error) {
            console.error("Error fetching contacts:", error);
         }
      };
      fetchData();
   }, [dispatch]);

      return (
         <div className="App">
            <BrowserRouter basename="Contact_List">
            <ToastContainer />
            <Navbar />

            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/add" element={<AddContact />}></Route>
               <Route path="/edit/:id" element={<EditContact />}></Route>{" "}
            </Routes>
            </BrowserRouter>
         </div>
      );
   };

   export default ContactList;
