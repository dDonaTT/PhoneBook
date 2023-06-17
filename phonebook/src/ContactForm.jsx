import React, { useState, useEffect } from "react";
import "./ContactForm.css";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ContactForm = () => {
  const { index } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const selectedContact = savedContacts[index];
    if (selectedContact) {
      setContact(selectedContact);
      setAdditionalEmails(selectedContact.additionalEmails || []);
      setAdditionalPhoneNumbers(selectedContact.additionalPhoneNumbers || []);
    } else {
      navigate("/contacts");
    }
  }, [index, navigate]);

  const [additionalEmails, setAdditionalEmails] = useState([]);
  const [additionalPhoneNumbers, setAdditionalPhoneNumbers] = useState([]);

  const handleAddEmail = () => {
    setAdditionalEmails([...additionalEmails, ""]);
  };

  const handleAddPhoneNumber = () => {
    setAdditionalPhoneNumbers([...additionalPhoneNumbers, ""]);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];

    if (index) {
      savedContacts[index] = {
        ...data,
        additionalEmails,
        additionalPhoneNumbers,
      };
    } else {
      savedContacts.push({
        ...data,
        additionalEmails,
        additionalPhoneNumbers,
      });
    }

    localStorage.setItem("contacts", JSON.stringify(savedContacts));
    navigate("/");

    event.target.reset();
    setContact({
      name: "",
      lastName: "",
      address: "",
      city: "",
      country: "",
      email: "",
      phoneNumber: "",
    });
    setAdditionalEmails([]);
    setAdditionalPhoneNumbers([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleAdditionalEmailChange = (index, value) => {
    const updatedEmails = [...additionalEmails];
    updatedEmails[index] = value;
    setAdditionalEmails(updatedEmails);
  };

  const handleAdditionalPhoneNumberChange = (index, value) => {
    const updatedPhoneNumbers = [...additionalPhoneNumbers];
    updatedPhoneNumbers[index] = value;
    setAdditionalPhoneNumbers(updatedPhoneNumbers);
  };
  return (
    <div className="App">
      <Navbar />
      <h2 style={{ margin: "20px", textAlign: "center" }}>
        {index ? "Edit Contact" : "Register New Contact"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
            value={contact.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            required
            value={contact.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            required
            value={contact.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            required
            value={contact.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Country"
            required
            value={contact.country}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={contact.email}
              onChange={handleChange}
              style={{ marginLeft: "70px", width: "900px", height: "30px" }}
            />
            <button
              type="button"
              onClick={handleAddEmail}
              className="formButton"
            >
              Add
            </button>
          </div>
        </div>
        {additionalEmails.map((email, index) => (
          <div className="form-row" key={index}>
            <input
              type="email"
              name={`additionalEmail-${index}`}
              placeholder="Email"
              required
              value={email}
              onChange={(e) =>
                handleAdditionalEmailChange(index, e.target.value)
              }
              style={{ width: "900px", height: "30px" }}
            />
          </div>
        ))}
        <div className="form-row" style={{ marginTop: "25px" }}>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              required
              value={contact.phoneNumber}
              onChange={handleChange}
              style={{ marginLeft: "70px", width: "900px", height: "30px" }}
            />
            <button
              type="button"
              onClick={handleAddPhoneNumber}
              className="formButton"
            >
              Add
            </button>
          </div>
        </div>
        {additionalPhoneNumbers.map((phoneNumber, index) => (
          <div className="form-row" key={index}>
            <input
              type="text"
              name={`additionalPhoneNumbers-${index}`}
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) =>
                handleAdditionalPhoneNumberChange(index, e.target.value)
              }
              required
              style={{ width: "900px", height: "30px" }}
            />
          </div>
        ))}
        <div className="form-row">
          <button type="submit" className="formButton">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
