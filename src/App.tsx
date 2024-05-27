import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Data } from "./types/type";
import Main from "./components/Main";
import Success from "./components/Success";

function App() {
  const [data, setData] = useState<Data>({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    countryCode: "91",
    phone: "",
    country: "India",
    city: "",
    panno: "",
    aadharno: "",
  });
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat">
      <Router>
        <Routes>
          <Route path="/" element={<Main data={data} setData={setData} />} />
          <Route path="/success" element={<Success data={data} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
