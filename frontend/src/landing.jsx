import React, { useState, useEffect } from 'react';
import { ShieldCheck, BrainCircuit, Users, CalendarDays, ArrowRight, Linkedin, Github, Twitter } from 'lucide-react';

// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-gray-50 font-sans antialiased text-gray-800">
      <LandingPage />
    </div>
  );
}

// --- Navigation Component ---
const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-50 py-4 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <BrainCircuit className="h-8 w-8 text-white" />
          <span className="ml-3 text-2xl font-bold text-white">CampusAI</span>
        </div>
        <nav>
          <a
            href="/login"
            className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
};

// --- Hero Section Component ---
const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
          alt="University Campus" 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1920x1080/334155/ffffff?text=CampusAI'; }}
        />
        <div className="absolute inset-0 bg-slate-800 opacity-60"></div>
      </div>
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
          The Future of Campus Management is Here
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 mb-8" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
          An AI-driven platform to streamline student success, enhance communication, and optimize administrative tasks.
        </p>
        <a 
          href="/login" 
          className="inline-flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </section>
  );
};

// --- Features Section Component ---
const features = [
  {
    icon: <BrainCircuit size={32} className="text-indigo-500" />,
    title: "AI-Powered Insights",
    description: "Leverage predictive analytics to support student outcomes and identify at-risk students proactively."
  },
  {
    icon: <CalendarDays size={32} className="text-indigo-500" />,
    title: "Automated Attendance",
    description: "Simplify tracking with smart, automated attendance systems, freeing up valuable faculty time."
  },
  {
    icon: <Users size={32} className="text-indigo-500" />,
    title: "Unified Communication",
    description: "Connect faculty, students, and administration on one seamless platform for better collaboration."
  },
  {
    icon: <ShieldCheck size={32} className="text-indigo-500" />,
    title: "Secure Data Management",
    description: "Ensure student and faculty data is protected with state-of-the-art security protocols."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose CampusAI?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform is built to address the core challenges of modern educational institutions.
          </p>
        </div>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Gallery Section Component ---
const images = [
  { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop", alt: "Students in a classroom" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop", alt: "Students collaborating with laptops" },
  { src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop", alt: "University library" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop", alt: "Teacher with students" },
  { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop", alt: "Students in a classroom" },

];

const GallerySection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Campus Life in Focus</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A glimpse into the vibrant and dynamic environment our platform supports.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover aspect-[3/4] transition-transform duration-500 ease-in-out group-hover:scale-110"
                onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/600x800/e2e8f0/334155?text=Campus+Image+${index+1}`; }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// --- Creator Section Component ---
const CreatorSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">Meet the Creator</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                    CampusAI is proudly developed and envisioned by a passionate creator dedicated to educational technology.
                </p>
                <div className="inline-block bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                    <img 
                        src="https://placehold.co/128x128/e0e7ff/4f46e5?text=RM" 
                        alt="Creator Ravi M" 
                        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-indigo-200"
                    />
                    <h3 className="text-2xl font-bold text-gray-900">Ravi Shetty</h3>
                    <p className="text-indigo-600 font-semibold mt-1">Full-Stcak-Developer</p>
                    <div className="mt-6 flex justify-center space-x-5">
                        <a href="https://www.linkedin.com/in/ravi-m-shetty/" className="text-gray-400 hover:text-gray-600 transition-colors"><Linkedin size={24} /></a>
                        <a href="https://github.com/Ravishetty07" className="text-gray-400 hover:text-gray-600 transition-colors"><Github size={24} /></a>
                       
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Footer Component ---
const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <BrainCircuit className="h-8 w-8" />
            <span className="ml-3 text-2xl font-bold">CampusAI</span>
          </div>
          <p className="text-gray-400 max-w-md mx-auto">
            Empowering educational institutions with intelligent, secure, and user-friendly management solutions.
          </p>
          <div className="mt-8 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">About</a>
            <a href="#" className="text-gray-400 hover:text-white">Features</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact</a>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-500">&copy; 2025 CampusAI | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};


// --- The Main Landing Page Component ---
function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <GallerySection />
        <CreatorSection />
      </main>
      <Footer />
    </div>
  );
}
