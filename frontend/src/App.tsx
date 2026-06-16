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
        <Route path="/van-vat-corporation/error/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
