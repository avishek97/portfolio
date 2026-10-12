import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import HeroImage from "./assets/HeroImage.JPG";
import "./Portfolio.scss";
import Response from "./Response";

export default function Portfolio() {
  const [query, setQuery] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function getResponse(query){
    const data = await getProfileDetails(query);
    setUserDetails(data)
    setProgress(false)
    console.log(data);
  }

  function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment>
  );
}

  async function getProfileDetails(input){
    try {
        const response = await fetch("http://localhost:8001/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({input: input})
        })

        if(!response.ok) {
            throw new Error(`Error: ${response.status} failed to fetch the user data`)
        }

        const data = await response.json();
        return data
    } catch(err) {
        console.error("Fetching Error", err);
    }
  }

  return (
    <div className="portfolio-container">
      {/* Header */}
      <motion.header
        className={`header ${scrolled ? "header-scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="logo">Avishek</div>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <div className="profile">
            <img
              src="https://github.com/shadcn.png"
              alt="profile"
            />
          </div>
        </nav>

        {/* Mobile Nav Button */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={28} />
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="nav-mobile-dropdown"
          >
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
            <div className="nav-mobile-profile">
              <img
                src="https://github.com/shadcn.png"
                alt="profile"
              />
              <button onClick={() => setMenuOpen(false)}>Login</button>
              <button onClick={() => setMenuOpen(false)}>Logout</button>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <motion.img
            src={HeroImage}
            alt="Hero"
            className="hero-image"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            />
        </div>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Welcome to My Portfolio
        </motion.h1>
      </section>

      {/* Ask About Avishek Section */}
      <section className="ask-section">
        <label>Ask About Avishek</label>
        <div className="ask-box">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question..."
          />
          <button onClick={()=>{getResponse(query)}}>Ask</button>
        </div>
      </section>
        <Response text={userDetails} isLoading={progress} />
    </div>
  );
}