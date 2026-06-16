import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Contact from '../components/sections/Contact';
import MaintenanceBanner from '../components/common/MaintenanceBanner';

const ContactUsPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <MaintenanceBanner />
            <Navbar />

            <main className="flex-grow pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <Contact />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactUsPage;
