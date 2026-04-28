import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis'; // Import Lenis
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import Article from './pages/Article';
import Research from './pages/Research';
import Upcoming from './pages/Upcoming';
import Events from './pages/Events';
import NotFound from './pages/NotFound';
import Team from './pages/Team';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AnnouncementBanner from './components/AnnouncementBanner';
import Contact from './pages/Contact';
import PastGuests from './pages/PastGuests';
import WebinarsPage from './pages/WebinarsPage';
import Research from './pages/Research';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Hide Navbar/Footer on Admin and Login pages
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    /* 1. ReactLenis Root: This is the engine that makes the planet scrolling work */
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div className="app-wrapper">
        
        {/* 2. Preloader: Only visible during initial load */}
        {isLoading && <Preloader onLoadComplete={() => setIsLoading(false)} />}

        {/* 3. Custom Cursor */}
        <CustomCursor />

        <style>{`
          :root {
            --accent-orange: #E85A24;
          }

          .app-wrapper {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-color: #050505;
            position: relative;
          }

          .content-layer {
            display: flex; 
            flex-direction: column;
            min-height: 100vh; 
            z-index: 1;
            gap: 0 !important;
          }

          main {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Clean Scrollbar Design */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #050505;
          }
          ::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: var(--accent-orange);
          }

          /* Lenis specific reset to prevent layout jitter */
          html.lenis {
            height: auto;
          }
          .lenis.lenis-smooth {
            scroll-behavior: auto;
          }
          .lenis.lenis-smooth [data-lenis-prevent] {
            overscroll-behavior: contain;
          }
          .lenis.lenis-stopped {
            overflow: hidden;
          }
        `}</style>

        {/* 4. Site Layout */}
        <div className="content-layer">
          {!isAdminRoute && <AnnouncementBanner />}
          {!isAdminRoute && <Navbar />}
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:id" element={<Article />} />
              <Route path="/events" element={<Events />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/research" element={<Article />} />
              <Route path="/team" element={<Team />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/past-guests" element={<PastGuests />} />
              <Route path="/webinars" element={<WebinarsPage />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />
            </Routes>
          </main>

          {!isAdminRoute && <Footer />}
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;