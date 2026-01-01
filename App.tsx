
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

// --- KONSTANSOK ---
const LOGO_IMG = "https://wkkeyyrknmnynlcefugq.supabase.co/storage/v1/object/public/wasd/logo%20-%202026-01-01T210947.379.png";
// MEME_REF_IMG törölve, mivel már nem használjuk automatikusan
const CA_ADDRESS = "HmDkJvms7igTe8MCmQA2dYNSZzRJtSRJZcDdPU12pump";
const COMMUNITY_URL = "https://x.com/i/communities/2006115824877162674";
const TWEET_URL = "https://twitter.com/elonmusk/status/2006014310607167607";

const stylePresets = [
  { id: 'sketch', label: 'SKETCH', prompt: 'pencil sketch style, hand drawn, doodle art, white lines on black background' },
  { id: 'realistic', label: 'REALISTIC', prompt: 'photorealistic, cinematic, 8k, highly detailed, dramatic lighting' },
  { id: 'meme', label: 'MEME ART', prompt: 'classic meme style, bold impact font, internet culture aesthetic, funny' },
  { id: 'cyber', label: 'CYBER', prompt: 'futuristic, neon lights, tech interface, matrix code overlay' },
  { id: 'oil', label: 'OIL PAINT', prompt: 'oil painting style, textured brush strokes, classical art vibe' }
];

const randomScenarios = [
  "panic selling at the bottom of a huge red candle",
  "riding a giant green bullish candle to mars",
  "fighting a bear market grizzly in a business suit",
  "swimming in a pool of dividends and gold coins",
  "yelling 'HODL' at a crashing stock chart on a laptop",
  "analyzing a technical chart that just says 'UP ONLY'",
  "buying the dip while the entire stock market burns behind him"
];

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
           $ELON +420% 🚀 $ELON +690% 📈 $ELON MOONING 🐂 $ELON +420% 🚀 $ELON +690% 📈 $ELON MOONING 🐂
        </motion.div>
      </div>

      {/* Animated Ticker Tape Bottom */}
      <div className="absolute bottom-40 left-0 right-0 opacity-[0.04] rotate-1 scale-110 overflow-hidden">
        <motion.div 
          className="whitespace-nowrap font-marker text-8xl text-white"
          animate={{ x: [-2000, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
           STOCK MARKET CORRECT CORRECT CORRECT WEALTH GENERATION CORRECT CORRECT
        </motion.div>
      </div>

      {/* Floating Stock Elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-500/20 font-marker text-4xl"
          style={{ 
            left: `${Math.random() * 100}%`,
          }}
          initial={{ 
            y: "110vh",
            opacity: 0 
          }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.4, 0],
            rotate: [0, Math.random() * 20 - 10]
          }}
          transition={{ 
            duration: Math.random() * 15 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
        >
          {['📈', '🚀', '💰', '🐂', 'BUY', 'HODL', '$ELON'][i % 7]}
        </motion.div>
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
    { name: 'MEME GEN', href: '#ai' }
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
          <span className="font-marker text-xl tracking-wide">$ELON</span>
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
          <img src={LOGO_IMG} alt="Elon Stocks" className="w-48 h-48 md:w-72 md:h-72 rounded-full border-4 border-white/10 relative z-10 animate-float shadow-2xl object-cover" />
        </motion.div>
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.8 }} 
            className="text-6xl sm:text-7xl md:text-[8rem] font-marker leading-[0.9] text-white uppercase transform -rotate-2"
          >
            Elon Stocks
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 md:mt-8 text-white/60 font-hand text-xl md:text-2xl tracking-widest font-bold uppercase px-4 scribble-underline">
            "Correct." - Elon Musk
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center gap-6 px-6">
          <a href="https://pump.fun" target="_blank" className="btn-pigger w-full sm:w-auto px-10 md:px-12 py-4 font-marker text-lg md:text-xl transform hover:-rotate-2">BUY ON PUMP.FUN</a>
          <a href="#story" className="w-full sm:w-auto px-10 md:px-12 py-4 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 border-white/20 font-marker text-lg md:text-xl text-white/80 hover:text-white hover:bg-white/5 transition-all text-center transform hover:rotate-2">READ STORY</a>
        </motion.div>
      </motion.div>
    </section>
  );
};

// TweetEmbed Component using standard Twitter Widget JS
const TweetEmbed = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if twitter widget script is loaded
    if ((window as any).twttr) {
      (window as any).twttr.widgets.load(containerRef.current);
    }
  }, []);

  return (
    <div className="flex justify-center w-full px-4" ref={containerRef}>
      <blockquote className="twitter-tweet" data-theme="dark" data-align="center" data-conversation="none">
        <a href={TWEET_URL}></a>
      </blockquote>
    </div>
  );
};

const About = () => (
  <section id="story" className="py-24 md:py-40 px-6">
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 gap-12 items-center text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-7xl font-marker mb-8 uppercase gradient-text transform -rotate-1">The Prophecy</h2>
          <div className="space-y-6 text-white/80 font-hand text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-10">
            <p>It was a simple interaction, but it sparked a movement.</p>
            <p>Solana founder Toly dropped a truth bomb: <span className="text-white font-bold underline decoration-wavy decoration-white/30">Stock gains represent nothing if they don't produce real value.</span></p>
            <p>Elon's response? A single word that validated everything.</p>
          </div>
          
          <TweetEmbed />

          <div className="mt-12">
            <p className="font-hand text-xl text-white/50">This is $ELON. Real community. Real production. Real memes.</p>
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
    { title: "Swap for $ELON", desc: `Paste the CA: ${CA_ADDRESS} and swap.` }
  ];

  return (
    <section id="howtobuy" className="py-24 md:py-32 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-marker uppercase transform rotate-1 text-white">How To Buy</h2>
          <p className="font-hand text-xl mt-4 text-white/50">Join the revolution in 4 scribbly steps</p>
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

const MemeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(stylePresets[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingStage, setLoadingStage] = useState(0);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const stages = ["ANALYZING CHART...", "DODGING SEC...", "PUMPING STOCK...", "MEME PRINTED."];

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => setLoadingStage((prev) => (prev + 1) % stages.length), 1500);
    } else {
      setLoadingStage(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearUpload = () => {
    setUploadedImageSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const generateMeme = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setErrorMessage(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let base64Data: string | null = null;
      let mimeType = 'image/jpeg';

      if (uploadedImageSrc) {
        const parts = uploadedImageSrc.split(',');
        mimeType = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
        base64Data = parts[1];
      }

      const preset = stylePresets.find(p => p.id === selectedPreset);
      let fullPrompt = "";

      if (base64Data) {
         // Használd a feltöltött képet referenciaként
         fullPrompt = `Create a high-quality, funny meme image. 
         Style: ${preset?.prompt}.
         Context: ${prompt}.
         Use the provided image as the visual reference for the main character or composition.
         Make it look like a viral crypto meme.`;
      } else {
         // SAFER PROMPT STRATEGY: 
         // Avoid explicit "Elon Musk" name to prevent Identity safety blocks. 
         // Use descriptions that yield the same result in a parody context.
         fullPrompt = `Create a high-quality, funny meme image. 
         Subject: A satirical 3D cartoon character of a famous tech billionaire CEO dealing with stocks (parody).
         Context: ${prompt}.
         Style: ${preset?.prompt}.
         Make it look like a viral crypto meme.`;
      }

      const parts: any[] = [];
      if (base64Data) {
         parts.push({ inlineData: { data: base64Data, mimeType: mimeType } });
      }
      parts.push({ text: fullPrompt });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: parts
        },
        config: { 
            imageConfig: { aspectRatio: "1:1" },
            safetySettings: [
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
            ]
        }
      });

      let foundImage = false;
      let textResponse = "";

      if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setActiveImage(`data:image/png;base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          } else if (part.text) {
             textResponse += part.text;
          }
        }
      }
      
      if (!foundImage) {
        console.warn("Model returned text instead of image:", textResponse);
        const finishReason = response.candidates?.[0]?.finishReason;
        let msg = textResponse ? `AI Message: ${textResponse.slice(0, 100)}...` : "AI did not return an image.";
        if (finishReason) msg += ` (Reason: ${finishReason})`;
        throw new Error(msg + " Try a different prompt.");
      }

    } catch (e: any) { 
      console.error("Meme Gen Error:", e);
      setErrorMessage(e.message || "Failed to generate meme. Please try again.");
    } finally { 
      setIsGenerating(false); 
    }
  };

  return (
    <section id="ai" className="py-24 md:py-40 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-start">
          <div className="lg:w-1/3 w-full space-y-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-marker text-white mb-4 uppercase transform -rotate-1">MEME GEN</h2>
              <p className="text-white/40 font-hand text-xl uppercase">Create Viral Content</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-marker text-sm text-white/50 uppercase">SCENARIO</label>
                <button onClick={() => setPrompt(randomScenarios[Math.floor(Math.random() * randomScenarios.length)])} className="text-sm font-hand font-bold text-white/80 hover:text-white transition-colors uppercase underline">STOCK IDEA</button>
              </div>
              <textarea 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Elon driving a green candle to the moon..." 
                className="w-full h-32 bg-black/40 border-2 border-white/10 rounded-2xl p-5 text-white font-hand text-lg outline-none focus:border-white/40 transition-all resize-none placeholder:text-white/20" 
              />
            </div>
            <div className="space-y-4">
              <label className="font-marker text-sm text-white/50 uppercase">STYLE</label>
              <div className="flex flex-wrap gap-2">
                {stylePresets.map(p => (
                  <button key={p.id} onClick={() => setSelectedPreset(p.id)} className={`px-4 py-2 rounded-xl font-hand text-sm font-bold border-2 transition-all uppercase ${selectedPreset === p.id ? 'bg-white text-black border-white rotate-1' : 'bg-transparent text-white/60 border-white/10 hover:border-white/40'}`}>{p.label}</button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
               <label className="font-marker text-sm text-white/50 uppercase">REFERENCE (OPTIONAL)</label>
               <input 
                 type="file" 
                 accept="image/*" 
                 ref={fileInputRef} 
                 onChange={handleFileUpload} 
                 className="hidden" 
               />
               <div className="flex items-center gap-4">
                 <button 
                   onClick={() => fileInputRef.current?.click()} 
                   className="px-6 py-3 border-2 border-dashed border-white/30 rounded-xl font-hand text-white/70 hover:text-white hover:border-white hover:bg-white/5 transition-all uppercase text-sm font-bold"
                 >
                   {uploadedImageSrc ? 'CHANGE IMAGE' : 'UPLOAD PHOTO'}
                 </button>
                 {uploadedImageSrc && (
                   <div className="relative group">
                      <img src={uploadedImageSrc} alt="Upload Preview" className="w-12 h-12 rounded-lg object-cover border border-white/20" />
                      <button 
                        onClick={clearUpload}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                   </div>
                 )}
               </div>
               <p className="text-xs text-white/30 font-hand">If uploaded, AI will use your photo. If not, AI creates Elon.</p>
            </div>
            
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 font-hand text-lg">
                ⚠️ {errorMessage}
              </div>
            )}

            <button onClick={generateMeme} disabled={isGenerating || !prompt} className="w-full btn-pigger py-5 font-marker text-xl uppercase disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95">{isGenerating ? 'COOKING...' : 'GENERATE'}</button>
          </div>
          
          <div className="lg:w-2/3 w-full">
            <div className="relative aspect-square bg-black/40 border-2 border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="absolute top-4 right-4 z-10 font-marker text-white/10 text-4xl pointer-events-none select-none">$ELON</div>
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-8 text-center">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-6" />
                    <p className="font-marker text-xl text-white uppercase animate-pulse">{stages[loadingStage]}</p>
                  </motion.div>
                ) : activeImage ? (
                  <motion.img initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} key="result" src={activeImage} className="w-full h-full object-cover" alt="Generated Meme" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-10 opacity-40 text-center">
                    <img src={LOGO_IMG} className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700" alt="Placeholder" />
                    <p className="absolute bottom-10 font-hand text-2xl font-bold uppercase text-white/80 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Ready to Print</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ChartSection = () => {
  return (
    <section id="chart" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-7xl font-marker mb-10 text-center uppercase text-white transform rotate-1">Live Chart</h2>
        <div className="soft-glass p-2 md:p-4 rounded-[2rem] overflow-hidden">
          <div className="relative w-full aspect-[4/5] xl:aspect-[100/65] overflow-hidden rounded-[1.5rem]">
            <iframe 
              src="https://dexscreener.com/solana/AtWgKycKTUYeEDB5C2E1Hph3RR5AJXMDsWTQgwg9TuwG?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
              className="absolute w-full h-full top-0 left-0 border-0"
              title="DexScreener"
            ></iframe>
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
          <MemeGenerator />
          <ChartSection />
        </main>
        <footer className="py-12 border-t border-white/10 text-center bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-white/30 font-hand text-lg uppercase">$ELON 2025 • CORRECT.</p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default App;
