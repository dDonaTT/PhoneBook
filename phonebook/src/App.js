import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Contacts from "./Contacts";
import ContactForm from "./ContactForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Contacts />} />

          <Route exact path="/contacts" element={<ContactForm />} />
          <Route exact path="/contacts/edit/:index" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
