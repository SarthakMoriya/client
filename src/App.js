import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import CreateRecord from "./components/CreateRecord/CreateRecord";
import GetRecord from "./components/UpdateRecord/GetRecord";
import { useEffect } from "react";
import { setRecords } from "./state";
import { useDispatch } from "react-redux";
import Edit from "./components/Edit/Edit";
import MyPanel from "./components/MyPanel/MyPanel";
import AdminLogin from "./components/Admin/AdminLogin";
import Panel from "./components/Admin/Panel";
import Pdf from "./components/PDF/Pdf";
import Certificate from "./components/Certificate/Certificate";
import { getRecords } from "./api";
import Footer from "./components/Footer/Footer";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
localStorage.setItem("is_verified", user ? user?.verified : false);

const fetchRecords=async()=>{
  const records=await getRecords();
  dispatch(setRecords({records}))

}
  useEffect(() => {
    fetchRecords();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <br />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/create"
          element={user != null ? <CreateRecord /> : <Login />}
        />
        <Route
          path="/record/:id"
          element={<GetRecord /> }
        />
        <Route
          path="/record/edit/:id"
          element={user != null ? <Edit /> : <Login />}
        />
        <Route
          path="/mypanel"
          element={user != null ? <MyPanel /> : <Login />}
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/panel"
          element={user != null ? <Panel /> : <AdminLogin />}
        />
        <Route path="/record/pdf/:id" element={<Pdf />} />
        <Route path="/record/certificate/:id" element={<Certificate />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
