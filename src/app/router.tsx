import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ConsentBanner from './components/ConsentBanner';
import Home from './pages/Home';
import About from './pages/About';
import Sources from './pages/Sources';
import Privacy from './pages/Privacy';
import Imprint from './pages/Imprint';

export default function Router() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/imprint" element={<Imprint />} />
          </Routes>
        </main>
        <Footer />
        <ConsentBanner />
      </div>
    </HashRouter>
  );
}
