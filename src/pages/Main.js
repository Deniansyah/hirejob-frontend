import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "./Landing";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import ConfirmPassword from "./ConfirmPassword";
import ConfirmRelogin from "./ConfirmRelogin";
import RequestPassword from "./RequestPassword";
import CompanyProfile from "./CompanyProfile";
import EditJobseekerProfile from "./EditJobseekerProfile";
import EditCompanyProfile from "./EditCompanyProfile";
import RegisterRecruiter from "./RegisterRecruiter";
import ProfileJobseeker from "./ProfileJobseeker";
import ExperiencesJobseeker from "./ExperienceJobseeker";
import Hire from "./Hire";
import Chat from "./Chat";

import PrivateRoute from "./middlewareComponent/PrivateRoute";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        {/* <Route path="/sort" element={<Sort />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/register-recruiter"
          element={<RegisterRecruiter />}
        ></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/confirm-password" element={<ConfirmPassword />}></Route>
        <Route path="/confirm-relogin" element={<ConfirmRelogin />}></Route>
        <Route path="/request-reset" element={<RequestPassword />}></Route>
        <Route
          path="/company-profile"
          element={
            <PrivateRoute>
              <CompanyProfile />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/edit-jobseeker-profile"
          element={
            <PrivateRoute>
              <EditJobseekerProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="edit-company-profile"
          element={
            <PrivateRoute>
              <EditCompanyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="jobseeker-profile/:id"
          element={
            <PrivateRoute>
              <ProfileJobseeker />
            </PrivateRoute>
          }
        />
        <Route
          path="jobseeker-profile/experiences/:id"
          element={
            <PrivateRoute>
              <ExperiencesJobseeker />
            </PrivateRoute>
          }
        />
        <Route path="/hire" element={<Hire />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
