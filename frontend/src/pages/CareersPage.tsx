import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import Team from '../components/sections/Team';
import Careers from '../components/sections/Careers';
import Contact from '../components/sections/Contact';
import SectionDivider from '../components/common/SectionDivider';
import MaintenanceBanner from '../components/common/MaintenanceBanner';

const CareersPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <MaintenanceBanner />
            <Navbar />

            <main className="flex-grow pt-16">
                <Hero />
                <Services />
                <SectionDivider />
                <About />
                <SectionDivider />
                <Team />
                <SectionDivider />
                <Careers />
                <SectionDivider />
                <Contact />
            </main>

            <Footer />
        </div>
    );
};

export default CareersPage;
