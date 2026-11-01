import React, { useEffect, useState } from "react";
import "@/App.css";
import { Toaster } from "sonner";
import { initLenis, stopLenis, startLenis } from "@/lib/scroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ink text-warm">
          <p className="font-serif text-2xl">Something went wrong. Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    initLenis();
    stopLenis();
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setStarted(true);
      startLenis();
      document.body.style.overflow = "";
    }, 2300);
    return () => clearTimeout(t);
  }, []);

  return (
    <ErrorBoundary>
      <div className="bg-ink font-sans text-warm">
        <Toaster position="bottom-right" />
        <Preloader done={started} />
        <Navbar started={started} />
        <main>
          <Hero started={started} />
          <Marquee />
          <About />
          <Services />
          <WhyChooseUs />
          <Projects />
          <Process />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </ErrorBoundary>
  );
}

export default App;