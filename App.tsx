
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- KONSTANSOK ---
const LOGO_IMG = "https://wkkeyyrknmnynlcefugq.supabase.co/storage/v1/object/public/neww/logo%20-%202026-01-16T171903.386.png";
const BANNER_IMG = "https://wkkeyyrknmnynlcefugq.supabase.co/storage/v1/object/public/neww/banner%20-%202026-01-16T173326.533.png";
const CA_ADDRESS = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const COMMUNITY_URL = "https://x.com";
const SLOGAN = "Pump my bag";

// --- KOMPONENSEK ---

const StockBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-[#050505] pointer-events-none">
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Animated Ticker Tape Top */}
      <div className="absolute top-20 left-0 right-0 opacity-[0.04] -rotate-2 scale-110 overflow-hidden">
        <motion.div 
          className="whitespace-nowrap font-marker text-9xl text-green-500"
          animate={{ x: [0, -2000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
           PUMP MY BAG 🚀 PUMP MY BAG 🚀 PUMP MY BAG 🚀 PUMP MY BAG 🚀 PUMP MY BAG 🚀
        </motion.div>
      </div>

      {/* Animated Ticker Tape Bottom */}
      <div className="absolute bottom-40 left-0 right-0 opacity-[0.04] rotate-1 scale-110 overflow-hidden">
        <motion.div 
          className="whitespace-nowrap font-marker text-8xl text-white"
          animate={{ x: [-2000, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
           PUMP MY BAG PUMP MY BAG PUMP MY BAG PUMP MY BAG PUMP MY BAG
        </motion.div>
      </div>

      {/* Floating #5cc077 Green Glow Effects */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute rounded-full blur-[60px] opacity-20"
          style={{ 
            backgroundColor: '#5cc077',
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
          }}
          initial={{ 
            y: "110vh",
            scale: 0.5,
          }}
          animate={{ 
            y: "-10vh", 
            scale: [1, 1.2, 1],
            opacity: [0, 0.25, 0],
          }}
          transition={{ 
            duration: Math.random() * 15 + 20, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
        />
      ))}

      {/* Floating Logo Elements */}
      {[...Array(20)].map((_, i) => (
        <motion.img
          key={i}
          src={LOGO_IMG}
          alt="Floating Logo"
          className="absolute w-12 h-12 md:w-16 md:h-16 opacity-10 rounded-full grayscale"
          style={{ 
            left: `${Math.random() * 100}%`,
          }}
          initial={{ 
            y: "110vh",
            opacity: 0 
          }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.2, 0],
            rotate: [0, Math.random() * 360]
          }}
          transition={{ 
            duration: Math.random() * 20 + 15, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
        />
      ))}

      {/* Enhanced Chart Lines */}
      <svg className="absolute w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 800 Q 300 700, 600 500 T 1200 300 T 1800 100 L 1800 1000 L 0 1000 Z"
          fill="url(#line-gradient)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
        <motion.path
          d="M0 800 Q 300 700, 600 500 T 1200 300 T 1800 100"
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { name: 'THE STORY', href: '#story' },
    { name: 'HOW TO BUY', href: '#howtobuy' },
    { name: 'TOKENOMICS', href: '#tokenomics' },
    { name: 'CHART', href: '#chart' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-6 md:py-6 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between soft-glass rounded-[2rem] px-6 py-3 pointer-events-auto relative bg-black/60">
        <div className="flex items-center gap-3">
          <img src={LOGO_IMG} alt="Logo" className="w-10 h-10 rounded-full border border-white/20 object-cover" />
          <span className="font-marker text-xl tracking-wide">$PUMPBAG</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <a key={item.name} href={item.href} className="font-hand text-lg font-bold tracking-widest text-white/60 hover:text-white transition-all uppercase">{item.name}</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href={COMMUNITY_URL} target="_blank" className="hidden sm:inline-flex btn-pigger px-6 py-2 font-marker text-sm tracking-widest uppercase hover:bg-white hover:text-black">JOIN X</a>
          
          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
          >
            <motion.span animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-8 h-0.5 bg-white block rounded-full" />
            <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-8 h-0.5 bg-white block rounded-full" />
            <motion.span animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-8 h-0.5 bg-white block rounded-full" />
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-4 soft-glass rounded-[2rem] p-8 md:hidden flex flex-col gap-6 items-center border border-white/20 bg-black/90 z-[101]"
            >
              {menuItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="font-marker text-2xl text-white hover:text-white/70 uppercase"
                >
                  {item.name}
                </a>
              ))}
              <a href={COMMUNITY_URL} target="_blank" className="btn-pigger w-full py-4 font-marker text-xl uppercase">JOIN COMMUNITY</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      <motion.div style={{ y: y1, opacity }} className="text-center w-full max-w-4xl">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} className="relative inline-block mb-8 md:mb-12">
          <div className="absolute inset-0 bg-white/10 blur-[80px] rounded-full" />
          <img src={LOGO_IMG} alt="Pump My Bag" className="w-48 h-48 md:w-72 md:h-72 rounded-full border-4 border-white/10 relative z-10 animate-float shadow-2xl object-cover" />
        </motion.div>
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.8 }} 
            className="text-6xl sm:text-7xl md:text-[8rem] font-marker leading-[0.9] text-white uppercase transform -rotate-2"
          >
            Pump my bag
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 md:mt-8 text-white/60 font-hand text-xl md:text-2xl tracking-widest font-bold uppercase px-4 scribble-underline">
            "Pump my bag."
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center gap-6 px-6">
          <a href="https://pump.fun" target="_blank" className="btn-pigger w-full sm:w-auto px-10 md:px-12 py-4 font-marker text-lg md:text-xl transform hover:-rotate-2">BUY ON PUMP.FUN</a>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(SLOGAN)}`} target="_blank" className="w-full sm:w-auto px-10 md:px-12 py-4 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 border-white/20 font-marker text-lg md:text-xl text-white/80 hover:text-white hover:bg-white/5 transition-all text-center transform hover:rotate-2">TWEET SLOGAN</a>
        </motion.div>
      </motion.div>
    </section>
  );
};

const About = () => (
  <section id="story" className="py-24 md:py-40 px-6">
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 gap-12 items-center text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-7xl font-marker mb-8 uppercase gradient-text transform -rotate-1">The Mission</h2>
          
          <div className="relative mb-12 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700">
             <img src={BANNER_IMG} alt="Pump my bag Banner" className="w-full object-cover" />
          </div>

          <div className="space-y-6 text-white/80 font-hand text-xl md:text-3xl leading-relaxed max-w-4xl mx-auto mb-10">
            <p>Bag coins are trending hard right now, but everyone knows the absolute <span className="text-green-400 font-bold">BEST</span> bags are found on <a href="https://pump.fun" className="underline decoration-wavy decoration-green-500">pump.fun</a>.</p>
            <p>That's why <span className="font-marker text-white">$PUMPBAG</span> is here.</p>
            <p className="text-2xl md:text-4xl font-marker mt-8 transform -rotate-1">"Pump my bag."</p>
          </div>
          
          <div className="mt-12">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(SLOGAN)}`} target="_blank" className="btn-pigger px-8 py-3 font-marker text-lg uppercase">
              TWEET THE SLOGAN
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const HowToBuy = () => {
  const steps = [
    { title: "Create Wallet", desc: "Download Phantom or Solflare wallet from the app store." },
    { title: "Get SOL", desc: "Buy SOL on an exchange (Binance, Coinbase) and send to wallet." },
    { title: "Go to Pump.fun", desc: "Connect your wallet to pump.fun." },
    { title: "Swap for $PUMPBAG", desc: `Paste the CA: ${CA_ADDRESS} and swap.` }
  ];

  return (
    <section id="howtobuy" className="py-24 md:py-32 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-marker uppercase transform rotate-1 text-white">How To Buy</h2>
          <p className="font-hand text-xl mt-4 text-white/50">Fill your bags in 4 scribbly steps</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="soft-glass p-6 md:p-8 rounded-[2rem] hover:bg-white/5 transition-all text-center group flex flex-col min-h-[300px]"
            >
              <div className="w-12 h-12 bg-white text-black font-marker text-2xl flex items-center justify-center rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform shrink-0">{i + 1}</div>
              <h3 className="font-marker text-2xl mb-3 text-white uppercase">{step.title}</h3>
              <div className="flex-grow flex items-center justify-center">
                <p className="font-hand text-lg text-white/70 leading-tight break-words max-w-full">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Tokenomics = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(CA_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tokenomics" className="py-24 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="soft-glass rounded-[3rem] p-8 md:p-16 text-center overflow-hidden relative">
          <h2 className="text-4xl md:text-8xl font-marker mb-10 uppercase text-white transform -rotate-1">The Contract</h2>
          
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-black/50 border-2 border-dashed border-white/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 group hover:border-white/40 transition-colors">
              <span className="flex-1 font-hand text-lg md:text-xl text-white/80 break-all">{CA_ADDRESS}</span>
              <button onClick={handleCopy} className="w-full md:w-auto px-6 py-3 bg-white text-black font-marker text-sm tracking-widest rounded-xl hover:bg-gray-200 transition-all uppercase transform hover:rotate-1">
                {copied ? 'COPIED!' : 'COPY CA'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ { label: "SUPPLY", val: "1B" }, { label: "TAX", val: "0/0" }, { label: "LIQUIDITY", val: "BURNED" } ].map((stat, i) => (
              <motion.div key={i} whileHover={{ y: -5, rotate: 1 }} className="p-8 border-2 border-white/10 rounded-[2rem] bg-black/20 flex flex-col items-center">
                <p className="text-sm font-marker text-white/40 tracking-widest mb-2 uppercase">{stat.label}</p>
                <p className="text-4xl font-hand font-bold text-white uppercase">{stat.val}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ChartSection = () => {
  return (
    <section id="chart" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-7xl font-marker mb-10 text-center uppercase text-white transform rotate-1">Live Chart</h2>
        <div className="soft-glass p-8 md:p-12 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center min-h-[500px] text-center relative group">
          
          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-green-500/5 blur-[100px] group-hover:bg-green-500/10 transition-colors duration-700" />
          
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative z-10 mb-8"
          >
            <img src={LOGO_IMG} alt="Loading Chart" className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/10 opacity-80 grayscale group-hover:grayscale-0 transition-all duration-500" />
          </motion.div>
          
          <h3 className="relative z-10 text-4xl md:text-6xl font-marker text-white/90 mb-4 uppercase">Chart Available At Launch</h3>
          <p className="relative z-10 text-xl font-hand text-white/50 max-w-lg">
            We are preparing the rockets. Once the contract is deployed and liquidity is added, the chart will appear here.
          </p>
          
          <div className="mt-8 relative z-10 p-4 border border-dashed border-white/20 rounded-xl bg-black/30">
            <p className="font-mono text-white/40 text-sm">Waiting for CA update...</p>
          </div>

        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-white selection:text-black">
      <StockBackground />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <HowToBuy />
          <Tokenomics />
          <ChartSection />
        </main>
        <footer className="py-12 border-t border-white/10 text-center bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-white/30 font-hand text-lg uppercase">$PUMPBAG 2026 • PUMP IT.</p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default App;
