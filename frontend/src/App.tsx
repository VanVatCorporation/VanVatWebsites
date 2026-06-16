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
import Crypshop from './pages/crypshop/Crypshop';
import Cryptocurrencies from './pages/cryptocurrencies/Cryptocurrencies';
import NotFound from './pages/error/NotFound';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SopriseAbout from './pages/soprise/SopriseAbout';
import VanVatBook from './pages/social/VanVatBook';
import Services from './pages/services/Services';
import Teams from './pages/teams/Teams';
import VanVatDrive from './pages/drive/VanVatDrive';
import VanVatAcademy from './pages/academy/VanVatAcademy';
import VanVatCamping from './pages/camping/VanVatCamping';
import VanVatHealthcare from './pages/healthcare/VanVatHealthcare';
import VanVatMusic from './pages/music/VanVatMusic';

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
        <Route path="/van-vat-corporation/crypshop" element={<Crypshop />} />
        <Route path="/van-vat-corporation/cryptocurrencies" element={<Cryptocurrencies />} />
        <Route path="/van-vat-corporation/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/van-vat-corporation/terms-of-service" element={<TermsOfService />} />
        <Route path="/van-vat-corporation/login" element={<Login />} />
        <Route path="/van-vat-corporation/register" element={<Register />} />
        <Route path="/van-vat-corporation/soprise/about" element={<SopriseAbout />} />
        <Route path="/van-vat-corporation/van-vat-book" element={<VanVatBook />} />
        <Route path="/van-vat-corporation/services" element={<Services />} />
        <Route path="/van-vat-corporation/teams" element={<Teams />} />
        <Route path="/van-vat-corporation/van-vat-drive" element={<VanVatDrive />} />
        <Route path="/van-vat-corporation/van-vat-academy" element={<VanVatAcademy />} />
        <Route path="/van-vat-corporation/van-vat-camping" element={<VanVatCamping />} />
        <Route path="/van-vat-corporation/van-vat-healthcare" element={<VanVatHealthcare />} />
        <Route path="/van-vat-corporation/van-vat-music" element={<VanVatMusic />} />
        <Route path="/van-vat-corporation/error/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
