import React, { useEffect, useRef, useState } from "react";
import DownloadPage from "./components/DownloadPage.jsx";
import ScrollProgressBar from "./components/ScrollProgressBar.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import ChannelCards from "./components/ChannelCards.jsx";
import ChannelControlSection from "./components/ChannelControlSection.jsx";
import ShortsBanSection from "./components/ShortsBanSection.jsx";
import TopicBanSection from "./components/TopicBanSection.jsx";
import RuleTypes from "./components/RuleTypes.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import KidsAndPrivacy from "./components/KidsAndPrivacy.jsx";
import Privacy from "./components/Privacy.jsx";
import Faq from "./components/Faq.jsx";
import Pricing from "./components/Pricing.jsx";
import PhotoBand from "./components/PhotoBand.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import Footer from "./components/Footer.jsx";
import NoyrisLogo from "./components/NoyrisLogo.jsx";
import Admin from "./components/Admin.jsx";
import { addEmail, ADMIN_HASH } from "./lib/emailStore.js";
import medow from "./assets/medow.jpg";

function ComingSoon() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-paper px-6 text-ink">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img src={medow} alt="" aria-hidden="true" loading="eager" className="h-full w-full object-cover opacity-20" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/5" />

      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        <NoyrisLogo size={56} className="text-ink" />
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">NOYRIS</h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          Stay focused. Automatically.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          We&rsquo;re putting the finishing touches on the site &mdash; coming soon.
        </p>

        {done ? (
          <p className="mt-8 rounded-full border border-brand/20 bg-brand/10 px-4 py-2 font-mono text-[11px] font-semibold text-brand">
            You&rsquo;re on the list &mdash; we&rsquo;ll write when we launch.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addEmail(email);
              setDone(true);
            }}
            className="mt-8 flex w-full max-w-sm items-center gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email for launch news"
              className="h-11 w-full flex-1 rounded-full border border-line bg-card px-4 text-sm text-ink placeholder:text-mist focus:border-brand focus:outline-none"
            />
            <button
              type="submit"
              className="h-11 flex-none rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-opacity hover:opacity-85"
            >
              Notify me
            </button>
          </form>
        )}

        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
          macOS &amp; Windows &middot; coming soon
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const heroRef = useRef(null);
  const [route, setRoute] = useState({ isDownloadPage: false, platform: null, isAdmin: false });

  /* The post-purchase / email link points at a hash route:
   *   #/download, #/success                -> download page, OS auto-detected
   *   #/download-mac, #/success-mac        -> macOS purchase page
   *   #/download-windows, #/success-windows-> Windows purchase page
   *   ADMIN_HASH (secret)                  -> email list admin
   * A bare `#download` (nav CTA) still scrolls to the marketing section. */
  useEffect(() => {
    const check = () => {
      const hash = window.location.hash.toLowerCase();
      const isAdmin = hash === ADMIN_HASH;
      const isDownloadPage =
        hash === "#/download" ||
        hash === "#/success" ||
        hash === "#/download-mac" ||
        hash === "#/success-mac" ||
        hash === "#/download-windows" ||
        hash === "#/success-windows";
      let platform = null;
      if (hash === "#/download-mac" || hash === "#/success-mac") platform = "mac";
      if (hash === "#/download-windows" || hash === "#/success-windows") platform = "windows";
      setRoute({ isDownloadPage, platform, isAdmin });
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  /* Temporarily replaced by a simple "Coming Soon" screen — all sections and
   * the download routes below are kept intact and hidden for now. */
  if (route.isAdmin) return <Admin />;
  return <ComingSoon />;

  if (route.isDownloadPage) {
    return <DownloadPage platform={route.platform} />;
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
      <TopicBanSection />
      <RuleTypes />
      <HowItWorks />
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
