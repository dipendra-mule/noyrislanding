import React, { useEffect, useRef, useState } from "react";
import DownloadPage from "./components/DownloadPage.jsx";
import ScrollProgressBar from "./components/ScrollProgressBar.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import ChannelCards from "./components/ChannelCards.jsx";
import ChannelControlSection from "./components/ChannelControlSection.jsx";
import ShortsBanSection from "./components/ShortsBanSection.jsx";
import Capabilities from "./components/Capabilities.jsx";
import TopicBanSection from "./components/TopicBanSection.jsx";
import RuleTypes from "./components/RuleTypes.jsx";
import CoinsRewards from "./components/CoinsRewards.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import ProductShowcase from "./components/ProductShowcase.jsx";
import KidsAndPrivacy from "./components/KidsAndPrivacy.jsx";
import Privacy from "./components/Privacy.jsx";
import Faq from "./components/Faq.jsx";
import Pricing from "./components/Pricing.jsx";
import PhotoBand from "./components/PhotoBand.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import Footer from "./components/Footer.jsx";
import medow from "./assets/medow.jpg";

export default function App() {
  const heroRef = useRef(null);
  const [isDownloadPage, setIsDownloadPage] = useState(false);

  /* The post-purchase / email link points at #/download (also #/success).
   * Show the standalone download page there instead of the marketing site. */
  useEffect(() => {
    const check = () => {
      const hash = window.location.hash.toLowerCase();
      setIsDownloadPage(hash === "#/download" || hash === "#/success");
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  if (isDownloadPage) {
    return <DownloadPage />;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-paper text-ink">
      <ScrollProgressBar />
      <Nav heroRef={heroRef} />
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={medow}
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
            style={{ objectPosition: "center top" }}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/20" />
        <div className="relative">
          <Hero ref={heroRef} />
          <ChannelCards />
        </div>
      </div>
      {/* <Marquee /> */}
      <ChannelControlSection />
      <ShortsBanSection />
      <Capabilities />
      <TopicBanSection />
      <RuleTypes />
      <CoinsRewards />
      <HowItWorks />
      <ProductShowcase />
      <KidsAndPrivacy />
      <Privacy />
      <Faq />
      <Pricing />
      <PhotoBand />
      <FinalCTA />
      <Footer />
    </div>
  );
}
