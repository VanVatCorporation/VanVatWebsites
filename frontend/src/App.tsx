import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import AccountCenter from './pages/account/AccountCenter';
import CompleteProfile from './pages/account/CompleteProfile';
import RequestDeletion from './pages/account/RequestDeletion';
import CareersPage from './pages/CareersPage';
import ContactUsPage from './pages/ContactUsPage';
import Soprise from './pages/soprise/Soprise';
import SopriseSellerLogin from './pages/soprise/seller/SopriseSellerLogin';
import SopriseSellerDashboard from './pages/soprise/seller/SopriseSellerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/van-vat-corporation/about-us" element={<AboutUs />} />
        <Route path="/van-vat-corporation/account/account-center" element={<AccountCenter />} />
        <Route path="/van-vat-corporation/account/complete-profile" element={<CompleteProfile />} />
        <Route path="/van-vat-corporation/account/request-deletion" element={<RequestDeletion />} />
        <Route path="/van-vat-corporation/careers" element={<CareersPage />} />
        <Route path="/van-vat-corporation/contact-us" element={<ContactUsPage />} />
        <Route path="/van-vat-corporation/soprise" element={<Soprise />} />
        <Route path="/van-vat-corporation/soprise/seller/login" element={<SopriseSellerLogin />} />
        <Route path="/van-vat-corporation/soprise/seller/dashboard" element={<SopriseSellerDashboard />} />
        {/* Future routes can be added here */}
      </Routes>
    </Router>
  );
}

export default App;
