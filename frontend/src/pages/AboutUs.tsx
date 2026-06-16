import React from 'react';
import MaintenanceBanner from '../components/common/MaintenanceBanner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import Team from '../components/sections/Team';
import Careers from '../components/sections/Careers';
import Contact from '../components/sections/Contact';
import SectionDivider from '../components/common/SectionDivider';

const AboutUs: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <MaintenanceBanner />
            <Navbar />

            <main className="flex-grow pt-16">
                {/* We reuse the same sections as the content in about-us/index.html 
            matches the landing page sections almost exactly in this structure */}
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

export default AboutUs;
