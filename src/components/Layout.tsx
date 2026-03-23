import React from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Sparkles, ArrowRight, Briefcase, Shield, Zap, Headphones, X, Search, Globe, TrendingUp, BarChart, Layers, ShoppingCart, Heart, Plus, Minus, Package, Truck, CreditCard as CardIcon } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, category, onAddToCart }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/20 transition-all duration-500"
  >
    <div className="aspect-square relative overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-brand-500 hover:text-white transition-colors">
          <Heart size={18} />
        </button>
        <button 
          onClick={onAddToCart}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-brand-500 hover:text-white transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="absolute bottom-6 left-6">
        <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm">
          {category}
        </span>
      </div>
    </div>
    <div className="p-8">
      <h3 className="font-display text-xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-brand-500 transition-colors">{name}</h3>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-slate-900 tracking-tighter">${price.toLocaleString()}</p>
        <button 
          onClick={onAddToCart}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500 hover:text-brand-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </motion.div>
);

export const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-[2rem] p-8 shadow-2xl overflow-hidden border border-slate-100"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full transition-colors"
        >
          <X size={20} className="text-slate-500" />
        </button>

        <div className="mb-8">
          <h3 className="font-display text-3xl font-bold text-slate-900 mb-2">Request a Demo</h3>
          <p className="text-slate-500">Fill out the form below and our team will be in touch shortly.</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">First Name</label>
              <input type="text" placeholder="John" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-500 transition-colors text-slate-900" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Last Name</label>
              <input type="text" placeholder="Doe" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-500 transition-colors text-slate-900" required />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Work Email</label>
            <input type="email" placeholder="john@company.com" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-500 transition-colors text-slate-900" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Company Name</label>
            <input type="text" placeholder="Acme Corp" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-500 transition-colors text-slate-900" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Message (Optional)</label>
            <textarea placeholder="Tell us about your needs..." rows={3} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-500 transition-colors resize-none text-slate-900" />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-brand-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-brand-500/20 mt-4"
          >
            Submit Request
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export const Navbar = ({ onGetStarted, cartCount = 0 }: { onGetStarted: () => void; cartCount?: number }) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-md px-8 py-4 rounded-full border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/40">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-slate-900 uppercase">Nexus Solutions</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Shop', 'Collections', 'About', 'Dashboard'].map((item) => (
            <a 
              key={item} 
              href={item === 'Dashboard' ? '#' : `#${item.toLowerCase()}`}
              onClick={item === 'Dashboard' ? (e) => { e.preventDefault(); onGetStarted(); } : undefined}
              className="text-[11px] font-bold text-slate-500 hover:text-brand-500 transition-colors uppercase tracking-[0.2em]"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => toast.info("Cart feature coming soon!")}
            className="relative p-2 text-slate-500 hover:text-brand-500 transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-brand-500/40">
                {cartCount}
              </span>
            )}
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGetStarted}
            className="px-8 py-3 bg-brand-500 text-white rounded-full font-bold text-[11px] hover:bg-brand-600 transition-all uppercase tracking-[0.2em] shadow-lg shadow-brand-500/20"
          >
            Seller Portal
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export const Hero = ({ onGetStarted, onRequestDemo }: { onGetStarted: () => void; onRequestDemo: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_70%)]" />
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-left"
          >

            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.85] text-slate-900 mb-10">
              Premium Goods <br />
              <span className="text-gradient">AI-Powered.</span>
            </h1>
            
            <p className="max-w-xl text-slate-800 text-xl mb-12 leading-relaxed font-medium">
              The future of e-commerce is here. Nexus Solutions uses advanced neural networks to curate a marketplace of unparalleled quality and relevance.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onGetStarted}
                className="px-10 py-5 bg-brand-500 text-white rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-2xl shadow-brand-500/30 hover:bg-brand-600 transition-all flex items-center justify-center gap-3"
              >
                Explore Collection <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRequestDemo}
                className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
              >
                Seller Portal
              </motion.button>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-slate-100">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-sm">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">12k+ Active Sellers</p>
                <p className="text-xs text-slate-700 font-medium">Joining the Nexus ecosystem today</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-500/20">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                alt="Premium Goods" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-3xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-700">AI Recommendation</p>
                      <p className="text-lg font-bold text-slate-900">Nexus One Pro</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">In Stock</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
                      <TrendingUp size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Global Sales</p>
                      <p className="text-sm font-bold text-slate-900">+124%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                      <Globe size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Active Users</p>
                      <p className="text-sm font-bold text-slate-900">12.4K</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-2xl font-bold text-slate-900 tracking-tighter">$1,299</p>
                  <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-500 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 p-4 glass rounded-2xl shadow-xl z-20 hidden xl:block border border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                  <Package size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Orders Today</p>
                  <p className="text-lg font-bold text-slate-900">842</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -left-12 p-4 glass rounded-2xl shadow-xl z-20 hidden xl:block border border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Security</p>
                  <p className="text-lg font-bold text-slate-900">Verified</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Personalization",
      description: "Nexus AI analyzes customer behavior to deliver hyper-personalized shopping experiences."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Global Logistics",
      description: "Seamless international shipping and real-time tracking powered by our global network."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Enterprise-grade encryption and fraud prevention for every transaction on our platform."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Smart Curation",
      description: "Our proprietary algorithms find the world's finest products so you don't have to."
    }
  ];

  return (
    <section id="solutions" className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end mb-32">
          <div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-brand-500 mb-8">
              The Nexus Advantage
            </span>
            <h2 className="font-display text-6xl md:text-7xl font-bold text-slate-900 tracking-tighter leading-[0.9]">
              E-commerce, <br />
              <span className="text-gradient">Redefined.</span>
            </h2>
          </div>
          <p className="text-slate-800 text-xl font-medium max-w-md">
            Everything you need to scale your online presence, powered by next-generation AI and global logistics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-brand-500/30 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div className="mb-10 w-16 h-16 bg-white rounded-2xl flex items-center justify-center group-hover:bg-brand-500 transition-all duration-500 shadow-sm">
                <div className="text-brand-500 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-800 leading-relaxed font-medium text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Footer = ({ id }: { id?: string }) => {
  return (
    <footer id={id} className="py-24 px-6 bg-white text-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-24 mb-32">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/40">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight uppercase text-slate-900">Nexus Solutions</span>
            </div>
            <p className="text-slate-800 leading-relaxed font-medium text-lg">
              Find You. We'll Help You Get There. Building the future of premium e-commerce.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-24">
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-[0.4em] text-slate-700 mb-10">Shop</h4>
              <ul className="space-y-6 text-slate-800 text-[11px] font-bold uppercase tracking-[0.2em]">
                {['New Arrivals', 'Best Sellers', 'Collections', 'Sale'].map((item) => (
                  <li key={item} className="hover:text-brand-500 cursor-pointer transition-colors">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-[0.4em] text-slate-700 mb-10">Company</h4>
              <ul className="space-y-6 text-slate-800 text-[11px] font-bold uppercase tracking-[0.2em]">
                {['About', 'Careers', 'Blog', 'Contact'].map((item) => (
                  <li key={item} className="hover:text-brand-500 cursor-pointer transition-colors">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-[0.4em] text-slate-700 mb-10">Social</h4>
              <ul className="space-y-6 text-slate-800 text-[11px] font-bold uppercase tracking-[0.2em]">
                {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                  <li 
                    key={social} 
                    onClick={() => toast.info(`Redirecting to our ${social} profile...`)}
                    className="hover:text-brand-500 cursor-pointer transition-colors"
                  >
                    {social}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-700">
          <p>© 2026 Nexus Solutions. All rights reserved.</p>
          <div className="flex gap-12">
            <span className="hover:text-brand-500 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-brand-500 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
