import Navbar from "./components/shared/Navbar.jsx";
import { Routes, Route } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";

import Browser from "./components/JobPage/Browser.jsx";
import Login from "./components/auth/Login.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import { HomepagesContainer } from "./components/home/HomepagesContainer.jsx";
import JobsPageContainer from "./components/JobPage/JobsPageContainer.jsx";
import Profile from "./components/Profile/Profile.jsx";
import CardDetails from "./components/JobPage/CardDetails.jsx";

import Companies from "./Admin/Companies.jsx";
import CreateCompanies from "./Admin/CreateCompanies.jsx";
import FillCompanyDetails from "./Admin/FillCompanyDetails.jsx";
import AdminJobs from "./Admin/AdminJobs.jsx";
import CreateJobs from "./Admin/CreateJobs.jsx";
import Applicants from "./Admin/Applicants.jsx";
import StatusDetails from "./components/Profile/StatusDetails.jsx";
import About from "../src/terms&conditions/About.jsx";
import Terms from "../src/terms&conditions/Terms.jsx";
import Contact from "./terms&conditions/Contact.jsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<HomepagesContainer />} />
        <Route path="/job" element={<JobsPageContainer />} />
        <Route path="/browser" element={<Browser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details/:id" element={<CardDetails />} />

        {/* Admin */}
        <Route path="/admin/companies" element={<Companies />} />
        <Route path="/admin/companies/create" element={<CreateCompanies />} />
        <Route path="/admin/companies/:id" element={<FillCompanyDetails />} />
        <Route path="/admin/job" element={<AdminJobs />} />
        <Route path="/admin/createJob" element={<CreateJobs />} />
        <Route path="/admin/jobs/:id/applicants" element={<Applicants />} />

        {/* Status */}
        <Route path="/status/details/:id" element={<StatusDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
