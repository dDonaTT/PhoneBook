import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Contacts.css";
import Navbar from "./Navbar";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(savedContacts);
  }, []);

  const handleDeleteContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <div className="container">
          <h3 className="heading">Contacts</h3>
          <Link to="/contacts" className="formButton">
            Add Contact
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.name}</td>
                <td>{contact.lastName}</td>
                <td>{contact.address}</td>
                <td>{contact.city}</td>
                <td>{contact.country}</td>
                <td>
                  <div>
                    {contact.email}
                    {contact.additionalEmails &&
                      contact.additionalEmails.map((email, i) => (
                        <div key={i}>{email}</div>
                      ))}
                  </div>
                </td>
                <td>
                  <div>
                    {contact.phoneNumber}
                    {contact.additionalPhoneNumbers &&
                      contact.additionalPhoneNumbers.map((number, i) => (
                        <div key={i}>{number}</div>
                      ))}
                  </div>
                </td>
                <td>
                  <Link to={`/contacts/edit/${index}`} className="edit">
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDeleteContact(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Contacts;
