import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login.jsx";
import { SignUp } from "./Pages/SignUp.jsx";
import { TicketList } from "./Pages/TicketList.jsx";
import { CreateTicket } from "./Pages/CreateTicket.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/create-ticket" element={<CreateTicket />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
