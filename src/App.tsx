import React, { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Navbar, Hero, Features, Footer, ContactModal, ProductCard } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const { scrollYProgress } = useScroll();
  
  const addToCart = (product: any) => {
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart!`);
  };

  const products = [
    { id: 1, name: "Nexus One Smartphone", price: 999, category: "Electronics", image: "https://picsum.photos/seed/phone/600/600" },
    { id: 2, name: "Aura Noise Cancelling Headphones", price: 349, category: "Audio", image: "https://picsum.photos/seed/headphones/600/600" },
    { id: 3, name: "Vanguard Smart Watch", price: 499, category: "Wearables", image: "https://picsum.photos/seed/watch/600/600" },
    { id: 4, name: "Lumina Desk Lamp", price: 129, category: "Home", image: "https://picsum.photos/seed/lamp/600/600" },
    { id: 5, name: "Zenith Mechanical Keyboard", price: 199, category: "Accessories", image: "https://picsum.photos/seed/keyboard/600/600" },
    { id: 6, name: "Titan Gaming Mouse", price: 89, category: "Accessories", image: "https://picsum.photos/seed/mouse/600/600" },
  ];
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen selection:bg-brand-500/30 selection:text-slate-900 overflow-x-hidden bg-[#f4f7fe]">
      <Toaster position="top-center" expand={false} richColors />
      
      <AnimatePresence>
        {isContactModalOpen && (
          <ContactModal 
            isOpen={isContactModalOpen} 
            onClose={() => {
              setIsContactModalOpen(false);
              toast.success("Request submitted! Our team will contact you shortly.");
            }} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showDashboard ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Dashboard onBack={() => setShowDashboard(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Animated Background Elements */}
            <div className="fixed inset-0 z-[-5] overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-500/5 rounded-full blur-[120px]"
              />
              <motion.div
                animate={{
                  x: [0, -80, 0],
                  y: [0, 120, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-600/5 rounded-full blur-[150px]"
              />
            </div>

            {/* Progress Bar */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-brand-500 origin-left z-[60]"
              style={{ scaleX }}
            />

            <Navbar onGetStarted={() => setShowDashboard(true)} cartCount={cart.length} />
            
            <main>
              <Hero 
                onGetStarted={() => setShowDashboard(true)} 
                onRequestDemo={() => setIsContactModalOpen(true)}
              />
              
              <section id="shop" className="py-24 px-6 bg-white relative">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-wrap items-end justify-between gap-12 mb-24">
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-brand-500 mb-8">
                        Curated Selection
                      </span>
                      <h2 className="font-display text-6xl md:text-7xl font-bold text-slate-900 tracking-tighter leading-[0.9]">
                        Featured <br />
                        <span className="text-gradient">Collections.</span>
                      </h2>
                    </div>
                    <p className="text-slate-600 text-xl font-medium max-w-md">
                      Explore our hand-picked selection of premium goods, powered by Nexus AI curation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {products.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        category={product.category}
                        image={product.image}
                        onAddToCart={() => addToCart(product)} 
                      />
                    ))}
                  </div>
                </div>
              </section>

              <Features />

              {/* Interactive Section */}
              <section className="py-24 px-6 bg-white relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/5 to-transparent" />
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-7xl mx-auto text-center relative z-10"
                >
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-brand-500 mb-8">
                    Start Your Journey
                  </span>
                  <h2 className="font-display text-7xl md:text-9xl font-bold text-slate-900 tracking-tighter leading-[0.85] mb-16">
                    Find You. <br />
                    <span className="text-gradient italic font-light serif">We'll Help You Get There.</span>
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsContactModalOpen(true)}
                    className="bg-brand-500 text-white px-16 py-8 rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:bg-brand-600 transition-all shadow-2xl shadow-brand-500/20"
                  >
                    Contact Our Strategists
                  </motion.button>
                </motion.div>
              </section>

              <section id="industries" className="py-24 px-6 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="max-w-7xl mx-auto relative z-10">
                  <div className="grid md:grid-cols-2 gap-32 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <span className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-brand-500 mb-8">
                        Don't Take Our Word for It
                      </span>
                      <h2 className="font-display text-6xl md:text-7xl font-bold mb-12 leading-[0.9] tracking-tighter text-slate-900">
                        AI Intelligence, <br />
                        <span className="text-gradient italic font-light serif">Rewired.</span>
                      </h2>
                      <p className="text-slate-600 text-xl mb-16 leading-relaxed font-medium">
                        "The scalability and security provided by Nexus allowed us to expand into 15 new markets in a single year. Their strategic consulting is world-class."
                      </p>
                      <div className="flex items-center gap-8">
                        <img 
                          src="https://picsum.photos/seed/ceo/120/120" 
                          alt="Robert Chen" 
                          className="w-20 h-20 rounded-full border-8 border-white shadow-2xl"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-xl tracking-tight">Robert Chen</p>
                          <p className="text-[10px] font-bold text-brand-500 uppercase tracking-[0.3em]">CTO at GlobalLogix</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="relative">
                      <div className="grid grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.02, y: -10 }}
                            className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-3xl bg-white p-2 border border-slate-100"
                          >
                            <img 
                              src={`https://picsum.photos/seed/editorial-${i}/600/800`} 
                              alt={`Editorial ${i}`}
                              className="w-full h-full object-cover rounded-[2.5rem] opacity-90 group-hover:opacity-100 transition-opacity"
                              referrerPolicy="no-referrer"
                            />
                          </motion.div>
                        ))}
                      </div>
                      {/* Decorative Element */}
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-500/5 rounded-full blur-3xl -z-10" />
                    </div>
                  </div>
                </div>
              </section>
            </main>

            <Footer id="about" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
