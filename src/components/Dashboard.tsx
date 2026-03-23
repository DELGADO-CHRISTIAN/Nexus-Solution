import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { geminiService } from '../services/geminiService';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  Bell, 
  LogOut, 
  TrendingUp, 
  Users, 
  CreditCard,
  Search,
  ChevronRight,
  ChevronLeft,
  Menu,
  Check,
  Plus,
  ExternalLink,
  Globe,
  Monitor,
  Calendar,
  DollarSign,
  Download,
  Info,
  X,
  Folder,
  Link,
  FileText,
  MapPin,
  Megaphone,
  Share2,
  PenTool,
  Home,
  ChevronDown,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  MessageSquare,
  Zap,
  Package,
  ShoppingCart
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const data = [
  { name: 'Jan 2024', value: 400, paid: 200, branded: 100 },
  { name: 'Feb 2024', value: 300, paid: 150, branded: 80 },
  { name: 'Mar 2024', value: 600, paid: 300, branded: 150 },
  { name: 'Apr 2024', value: 800, paid: 400, branded: 200 },
  { name: 'May 2024', value: 500, paid: 250, branded: 120 },
  { name: 'Jun 2024', value: 900, paid: 450, branded: 250 },
  { name: 'Jul 2024', value: 1100, paid: 550, branded: 300 },
];

const keywordData = [
  { name: 'Jan', top3: 400, top10: 300, top20: 200, top50: 100, top100: 50 },
  { name: 'Feb', top3: 450, top10: 320, top20: 210, top50: 110, top100: 60 },
  { name: 'Mar', top3: 420, top10: 350, top20: 230, top50: 120, top100: 70 },
  { name: 'Apr', top3: 500, top10: 380, top20: 250, top50: 130, top100: 80 },
  { name: 'May', top3: 550, top10: 400, top20: 270, top50: 140, top100: 90 },
  { name: 'Jun', top3: 600, top10: 420, top20: 290, top50: 150, top100: 100 },
];

const countryData = [
  { country: 'Worldwide', traffic: '1.4M', keywords: '487.3K', percentage: 100, color: 'bg-brand-500' },
  { country: 'IN', traffic: '1.3M', keywords: '288.7K', percentage: 92, color: 'bg-brand-400' },
  { country: 'US', traffic: '19.5K', keywords: '84.8K', percentage: 15, color: 'bg-brand-200' },
  { country: 'NG', traffic: '10.6K', keywords: '172', percentage: 8, color: 'bg-brand-100' },
  { country: 'Other', traffic: '74.9K', keywords: '113.7K', percentage: 25, color: 'bg-brand-50' },
];

const pieData = [
  { name: 'Organic', value: 97.5, color: '#e67e5f' },
  { name: 'AI Overviews', value: 0.2, color: '#a855f7' },
  { name: 'Other SERP Features', value: 2.3, color: '#10b981' },
];

interface DashboardProps {
  onBack: () => void;
}

export const Dashboard = ({ onBack }: DashboardProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Profile State
  const [profile, setProfile] = useState({
    name: 'Nexus Admin',
    email: 'admin@nexussolutions.ai',
    bio: 'E-commerce Operations Manager',
    avatar: 'https://picsum.photos/seed/admin/100/100'
  });

  // Notification State
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
    marketing: false
  });

  // System State
  const [system, setSystem] = useState({
    darkMode: false,
    compactView: false
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // AI State
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiKeywords, setAiKeywords] = useState<any[]>([]);
  const [customQuestion, setCustomQuestion] = useState("");

  const handleAiAction = async (type: string, payload?: string) => {
    setIsAiLoading(true);
    setAiResponse(null);
    setAiKeywords([]);
    setActiveTab('ai-insights');
    
    try {
      if (type === 'analyze') {
        const result = await geminiService.analyzeSEO(payload || 'thehansindia.com');
        setAiResponse(result);
      } else if (type === 'keywords') {
        const result = await geminiService.suggestKeywords(payload || 'SEO trends 2026');
        setAiKeywords(result);
        setAiResponse("Keyword analysis complete. See the table below.");
      } else if (type === 'content') {
        const result = await geminiService.generateContentIdea(payload || 'AI in SEO');
        setAiResponse(result);
      } else if (type === 'custom') {
        const result = await geminiService.askCustomQuestion(payload || customQuestion);
        setAiResponse(result);
        setCustomQuestion("");
      }
      toast.success("AI Analysis Complete");
    } catch (error) {
      console.error(error);
      toast.error("Failed to get AI insights. Please check your API key.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      toast.success("Profile updated successfully!");
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleResetNotifications = () => {
    setNotifications({
      email: true,
      push: true,
      updates: true,
      marketing: false
    });
    toast.info("Notification preferences reset to default.");
  };

  return (
    <div className={`flex h-screen bg-[#f4f7fe] text-slate-900 font-sans overflow-hidden relative transition-colors duration-300`}>
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 260 : 80,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white border-r border-slate-200 flex flex-col relative z-20 shadow-sm"
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-12 w-6 h-6 bg-white border border-slate-200 text-slate-500 rounded-full flex items-center justify-center shadow-md hover:text-brand-500 transition-all z-30"
        >
          {isSidebarOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        </button>

        <div className={`p-8 flex items-center ${isSidebarOpen ? 'gap-3' : 'justify-center'}`}>
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex-shrink-0 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-display font-bold text-lg tracking-tight uppercase whitespace-nowrap text-slate-800"
              >
                Nexus
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className={`flex-1 ${system.compactView ? 'px-3 space-y-1' : 'px-4 space-y-1'} overflow-y-auto custom-scrollbar`}>
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Overview" isOpen={isSidebarOpen} active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarItem icon={<Package size={18} />} label="Inventory" isOpen={isSidebarOpen} active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
          <SidebarItem icon={<ShoppingCart size={18} />} label="Orders" isOpen={isSidebarOpen} active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <SidebarItem icon={<Sparkles size={18} />} label="AI Insights" isOpen={isSidebarOpen} active={activeTab === 'ai-insights'} onClick={() => setActiveTab('ai-insights')} />
          
          <div className="pt-6 mt-6 border-t border-slate-100">
            <SidebarItem icon={<User size={18} />} label="Profile" isOpen={isSidebarOpen} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            <SidebarItem icon={<Bell size={18} />} label="Notifications" isOpen={isSidebarOpen} active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
            <SidebarItem icon={<Settings size={18} />} label="Settings" isOpen={isSidebarOpen} active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </div>
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 px-4 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors w-full py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {isSidebarOpen && <span className="whitespace-nowrap">Exit</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 relative z-10">
          <div className="flex items-center gap-8">
            <h1 className="font-display text-xl font-bold text-slate-800 tracking-tight">Seller Portal</h1>
            
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {['Overview', 'Inventory', 'Orders'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab.toLowerCase() ? 'bg-white text-brand-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all">
              Add Product
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-sm">
              <img src={profile.avatar} alt="Avatar" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500">
                        <DollarSign size={24} />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+12.5%</span>
                    </div>
                    <p className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-1">Total Revenue</p>
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">$128,430</h3>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                        <ShoppingCart size={24} />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+8.2%</span>
                    </div>
                    <p className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-1">Total Orders</p>
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">1,240</h3>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500">
                        <Users size={24} />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+5.7%</span>
                    </div>
                    <p className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-1">Total Customers</p>
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">856</h3>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                        <TrendingUp size={24} />
                      </div>
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">-2.1%</span>
                    </div>
                    <p className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-1">Conversion Rate</p>
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">3.42%</h3>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="font-display font-bold text-lg text-slate-900">Revenue Over Time</h3>
                      <select className="bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-500 px-4 py-2 focus:ring-brand-500">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 12 Months</option>
                      </select>
                    </div>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
                          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                          <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="font-display font-bold text-lg text-slate-900 mb-8">Sales by Category</h3>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Electronics', value: 45, color: '#3b82f6' },
                              { name: 'Home', value: 25, color: '#10b981' },
                              { name: 'Fashion', value: 20, color: '#f59e0b' },
                              { name: 'Others', value: 10, color: '#64748b' },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                          >
                            {[
                              { color: '#3b82f6' },
                              { color: '#10b981' },
                              { color: '#f59e0b' },
                              { color: '#64748b' },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3 mt-4">
                      {[
                        { name: 'Electronics', value: '45%', color: 'bg-blue-500' },
                        { name: 'Home', value: '25%', color: 'bg-emerald-500' },
                        { name: 'Fashion', value: '20%', color: 'bg-amber-500' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${item.color}`} />
                            <span className="text-slate-700">{item.name}</span>
                          </div>
                          <span className="text-slate-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Orders Preview */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display font-bold text-lg text-slate-900">Recent Orders</h3>
                    <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors uppercase tracking-widest">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-4">
                          <th className="pb-4">Order ID</th>
                          <th className="pb-4">Customer</th>
                          <th className="pb-4">Product</th>
                          <th className="pb-4">Amount</th>
                          <th className="pb-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[
                          { id: '#ORD-7421', customer: 'John Doe', product: 'Nexus One', amount: '$999.00', status: 'Delivered', statusColor: 'text-emerald-500 bg-emerald-50' },
                          { id: '#ORD-7422', customer: 'Jane Smith', product: 'Aura Headphones', amount: '$349.00', status: 'Processing', statusColor: 'text-blue-500 bg-blue-50' },
                          { id: '#ORD-7423', customer: 'Robert Brown', product: 'Vanguard Watch', amount: '$499.00', status: 'Shipped', statusColor: 'text-amber-500 bg-amber-50' },
                        ].map((order, idx) => (
                          <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 text-xs font-bold text-slate-900">{order.id}</td>
                            <td className="py-4 text-xs font-medium text-slate-800">{order.customer}</td>
                            <td className="py-4 text-xs font-medium text-slate-800">{order.product}</td>
                            <td className="py-4 text-xs font-bold text-slate-900">{order.amount}</td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.statusColor}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
            {activeTab === 'inventory' && (
              <motion.div
                key="inventory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display font-bold text-lg text-slate-900">Product Inventory</h3>
                    <div className="flex gap-4">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                        <input type="text" placeholder="Search products..." className="pl-12 pr-6 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-medium focus:ring-brand-500 w-64" />
                      </div>
                      <button className="px-6 py-2.5 bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all">
                        Add Product
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-4">
                          <th className="pb-4">Product</th>
                          <th className="pb-4">Category</th>
                          <th className="pb-4">Price</th>
                          <th className="pb-4">Stock</th>
                          <th className="pb-4">Status</th>
                          <th className="pb-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[
                          { name: 'Nexus One Smartphone', category: 'Electronics', price: '$999.00', stock: 45, status: 'In Stock', statusColor: 'text-emerald-500 bg-emerald-50' },
                          { name: 'Aura Headphones', category: 'Audio', price: '$349.00', stock: 12, status: 'Low Stock', statusColor: 'text-amber-500 bg-amber-50' },
                          { name: 'Vanguard Smart Watch', category: 'Wearables', price: '$499.00', stock: 0, status: 'Out of Stock', statusColor: 'text-rose-500 bg-rose-50' },
                          { name: 'Lumina Desk Lamp', category: 'Home', price: '$129.00', stock: 89, status: 'In Stock', statusColor: 'text-emerald-500 bg-emerald-50' },
                        ].map((product, idx) => (
                          <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden">
                                  <img src={`https://picsum.photos/seed/${product.name}/100/100`} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                                <span className="text-xs font-bold text-slate-900">{product.name}</span>
                              </div>
                            </td>
                            <td className="py-4 text-xs font-medium text-slate-800">{product.category}</td>
                            <td className="py-4 text-xs font-bold text-slate-900">{product.price}</td>
                            <td className="py-4 text-xs font-medium text-slate-800">{product.stock} units</td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${product.statusColor}`}>
                                {product.status}
                              </span>
                            </td>
                            <td className="py-6 text-right">
                              <button className="p-2 text-slate-700 hover:text-brand-500 transition-colors">
                                <PenTool size={16} />
                              </button>
                              <button className="p-2 text-slate-700 hover:text-rose-500 transition-colors">
                                <X size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display font-bold text-lg text-slate-900">Customer Orders</h3>
                    <div className="flex gap-4">
                      <select className="bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-700 px-4 py-2.5 focus:ring-brand-500">
                        <option>All Statuses</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-4">
                          <th className="pb-4">Order ID</th>
                          <th className="pb-4">Date</th>
                          <th className="pb-4">Customer</th>
                          <th className="pb-4">Total</th>
                          <th className="pb-4">Status</th>
                          <th className="pb-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[
                          { id: '#ORD-7421', date: 'Mar 22, 2026', customer: 'John Doe', total: '$999.00', status: 'Delivered', statusColor: 'text-emerald-500 bg-emerald-50' },
                          { id: '#ORD-7422', date: 'Mar 21, 2026', customer: 'Jane Smith', total: '$349.00', status: 'Processing', statusColor: 'text-blue-500 bg-blue-50' },
                          { id: '#ORD-7423', date: 'Mar 21, 2026', customer: 'Robert Brown', total: '$499.00', status: 'Shipped', statusColor: 'text-amber-500 bg-amber-50' },
                          { id: '#ORD-7424', date: 'Mar 20, 2026', customer: 'Emily Davis', total: '$129.00', status: 'Cancelled', statusColor: 'text-slate-500 bg-slate-50' },
                        ].map((order, idx) => (
                          <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 text-xs font-bold text-slate-900">{order.id}</td>
                            <td className="py-4 text-xs font-medium text-slate-800">{order.date}</td>
                            <td className="py-4 text-xs font-medium text-slate-800">{order.customer}</td>
                            <td className="py-4 text-xs font-bold text-slate-900">{order.total}</td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.statusColor}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-6 text-right">
                              <button className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-[10px] font-bold hover:bg-slate-100 transition-all">
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ai-insights' && (
              <motion.div
                key="ai-insights"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white border border-slate-200 rounded-[3rem] p-8 shadow-sm min-h-[500px] relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-500/5 via-transparent to-purple-500/5 opacity-50 pointer-events-none" />
                      
                      <div className="flex items-center justify-between mb-12 relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-500">
                            <Sparkles size={24} />
                          </div>
                          <div>
                            <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">E-commerce Intelligence</h2>
                            <p className="text-slate-700 text-xs font-bold uppercase tracking-widest mt-1">Powered by Gemini 1.5 Pro</p>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10">
                        {isAiLoading ? (
                          <div className="flex flex-col items-center justify-center h-[300px] space-y-6">
                            <div className="w-16 h-16 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
                            <p className="text-slate-600 font-bold uppercase tracking-[0.3em] animate-pulse">Gemini is analyzing sales data...</p>
                          </div>
                        ) : aiResponse ? (
                          <div className="prose max-w-none">
                            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-slate-700 leading-relaxed whitespace-pre-wrap font-medium text-lg">
                              {aiResponse}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-8">
                            <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                              <TrendingUp size={48} />
                            </div>
                            <div className="space-y-4">
                              <h3 className="text-2xl font-bold text-slate-900">Sales & Inventory Insights</h3>
                              <p className="text-slate-700 max-w-sm mx-auto">Select a quick action or ask a custom question to get AI-powered recommendations for your store.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                      <h3 className="font-display font-bold text-lg text-slate-900 mb-6">Quick Actions</h3>
                      <div className="space-y-4">
                        <button 
                          onClick={() => handleAiAction('analyze')}
                          disabled={isAiLoading}
                          className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-500">
                              <TrendingUp size={18} />
                            </div>
                            <span className="text-sm font-bold text-slate-700">Sales Forecasting</span>
                          </div>
                          <ChevronRight size={16} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
                        </button>
                        
                        <button 
                          onClick={() => handleAiAction('keywords')}
                          disabled={isAiLoading}
                          className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                              <Package size={18} />
                            </div>
                            <span className="text-sm font-bold text-slate-700">Inventory Optimization</span>
                          </div>
                          <ChevronRight size={16} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
                        </button>

                        <button 
                          onClick={() => handleAiAction('content')}
                          disabled={isAiLoading}
                          className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                              <Users size={18} />
                            </div>
                            <span className="text-sm font-bold text-slate-700">Customer Segmentation</span>
                          </div>
                          <ChevronRight size={16} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                      <h3 className="font-display font-bold text-lg text-slate-900 mb-6">Ask Gemini</h3>
                      <div className="space-y-4">
                        <textarea 
                          value={customQuestion}
                          onChange={(e) => setCustomQuestion(e.target.value)}
                          placeholder="Ask about your sales, inventory, or customers..."
                          className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-500/50 transition-colors resize-none"
                        />
                        <button 
                          onClick={() => handleAiAction('custom')}
                          disabled={isAiLoading || !customQuestion.trim()}
                          className="w-full py-4 bg-brand-500 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-brand-500/20 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          Get Insights
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                <div className="flex flex-col items-center mb-8">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl overflow-hidden border-[8px] border-slate-50 shadow-xl">
                      <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-brand-500 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-brand-600 transition-all transform hover:scale-110">
                      <User size={20} />
                    </button>
                  </div>
                  <h3 className="mt-6 font-display font-bold text-3xl text-slate-900 tracking-tight">{profile.name}</h3>
                  <p className="text-slate-700 font-bold uppercase tracking-[0.4em] mt-2 text-[10px]">System Administrator</p>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-700 ml-4">Full Name</label>
                      <input 
                        type="text" 
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-full px-6 py-4 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 outline-none transition-all font-medium text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-700 ml-4">Email Address</label>
                      <input 
                        type="email" 
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-full px-6 py-4 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 outline-none transition-all font-medium text-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-700 ml-4">Bio</label>
                    <textarea 
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 outline-none transition-all font-medium text-lg resize-none"
                    />
                  </div>
                  <button 
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className={`w-full ${saveSuccess ? 'bg-emerald-500' : 'bg-brand-500'} text-white py-4 rounded-full font-bold text-xs uppercase tracking-[0.4em] hover:brightness-110 transition-all shadow-2xl shadow-brand-500/20 mt-8 flex items-center justify-center gap-4`}
                  >
                    {isSaving ? (
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : saveSuccess ? (
                      <>
                        <Check size={24} />
                        Changes Saved!
                      </>
                    ) : (
                      'Save Profile Changes'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-8">
                <h3 className="font-display font-bold text-3xl text-slate-900 tracking-tight">Notification Settings</h3>
                
                <div className="space-y-6">
                  <NotificationToggle 
                    label="Email Notifications" 
                    description="Receive weekly reports and project updates via email."
                    enabled={notifications.email}
                    onToggle={() => setNotifications({...notifications, email: !notifications.email})}
                  />
                  <NotificationToggle 
                    label="Push Notifications" 
                    description="Get real-time alerts on your desktop or mobile device."
                    enabled={notifications.push}
                    onToggle={() => setNotifications({...notifications, push: !notifications.push})}
                  />
                  <NotificationToggle 
                    label="Product Updates" 
                    description="Be the first to know about new features and improvements."
                    enabled={notifications.updates}
                    onToggle={() => setNotifications({...notifications, updates: !notifications.updates})}
                  />
                  <NotificationToggle 
                    label="Marketing Emails" 
                    description="Occasional news about our partners and special offers."
                    enabled={notifications.marketing}
                    onToggle={() => setNotifications({...notifications, marketing: !notifications.marketing})}
                  />
                </div>

                <div className="pt-12 border-t border-slate-100">
                  <button 
                    onClick={handleResetNotifications}
                    className="text-brand-500 font-bold text-xs uppercase tracking-[0.3em] hover:text-brand-600 transition-all"
                  >
                    Reset to default preferences
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                <h4 className="font-display font-bold text-2xl mb-8 flex items-center gap-4 text-slate-900 tracking-tight">
                  <LayoutDashboard size={24} className="text-brand-500" />
                  Appearance
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                    <span className="font-bold text-lg text-slate-900">Dark Mode</span>
                    <button 
                      onClick={() => setSystem({...system, darkMode: !system.darkMode})}
                      className={`w-16 h-10 rounded-full relative transition-all duration-500 ${system.darkMode ? 'bg-brand-500' : 'bg-slate-200'}`}
                    >
                      <motion.div 
                        animate={{ x: system.darkMode ? 28 : 4 }}
                        className="absolute top-1.5 w-7 h-7 bg-white rounded-full shadow-md" 
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                    <span className="font-bold text-lg text-slate-900">Compact View</span>
                    <button 
                      onClick={() => setSystem({...system, compactView: !system.compactView})}
                      className={`w-16 h-10 rounded-full relative transition-all duration-500 ${system.compactView ? 'bg-brand-500' : 'bg-slate-200'}`}
                    >
                      <motion.div 
                        animate={{ x: system.compactView ? 28 : 4 }}
                        className="absolute top-1.5 w-7 h-7 bg-white rounded-full shadow-md" 
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                <h4 className="font-display font-bold text-2xl mb-8 flex items-center gap-4 text-slate-900 tracking-tight">
                  <Users size={24} className="text-brand-500" />
                  Privacy & Data
                </h4>
                <div className="space-y-4">
                  <button 
                    onClick={() => toast.promise(new Promise(res => setTimeout(res, 2000)), {
                      loading: 'Preparing data export...',
                      success: 'Data export ready for download!',
                      error: 'Export failed. Please try again.',
                    })}
                    className="w-full text-left p-6 bg-slate-50 border border-slate-100 hover:bg-slate-100 rounded-2xl transition-all flex items-center justify-between group"
                  >
                    <span className="font-bold text-lg text-slate-900">Export My Data</span>
                    <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-2 transition-all" />
                  </button>
                  <button 
                    onClick={() => toast.error("Account deletion requires administrative approval.")}
                    className="w-full text-left p-6 bg-rose-50 border border-rose-100 hover:bg-rose-100/50 rounded-2xl transition-all flex items-center justify-between group"
                  >
                    <span className="font-bold text-lg text-rose-600">Delete Account</span>
                    <ChevronRight size={20} className="text-rose-200 group-hover:translate-x-2 transition-all" />
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 bg-white border border-slate-200 p-12 rounded-3xl text-slate-900 overflow-hidden relative shadow-sm">
                <div className="relative z-10">
                  <h4 className="font-display font-bold text-3xl mb-4 tracking-tight">System Status</h4>
                  <p className="text-slate-700 text-lg mb-8 max-w-3xl font-light leading-relaxed">All systems are operational. Last checked 2 minutes ago.</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                      API: Online
                    </div>
                    <div className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                      Database: Online
                    </div>
                  </div>
                </div>
                <div className="absolute -right-40 -bottom-40 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[160px]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const NotificationToggle = ({ label, description, enabled, onToggle }: { label: string, description: string, enabled: boolean, onToggle: () => void }) => (
  <div className="flex items-center justify-between p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all shadow-sm">
    <div className="max-w-md">
      <h4 className="font-bold text-lg mb-1 text-slate-900">{label}</h4>
      <p className="text-xs text-slate-800 font-medium leading-relaxed">{description}</p>
    </div>
    <button 
      onClick={onToggle}
      className={`w-16 h-10 rounded-full relative transition-all duration-500 ${enabled ? 'bg-brand-500' : 'bg-slate-200'}`}
    >
      <motion.div 
        animate={{ x: enabled ? 28 : 4 }}
        className="absolute top-1.5 w-7 h-7 bg-white rounded-full shadow-md"
      />
    </button>
  </div>
);

const AIRow = ({ name, mentions, citations, icon, onClick }: { name: string, mentions: number, citations: number, icon: string, onClick?: () => void }) => (
  <motion.div 
    onClick={onClick}
    whileHover={{ x: 4, backgroundColor: "rgba(0,0,0,0.02)" }}
    className="flex items-center justify-between py-6 px-8 rounded-3xl cursor-pointer transition-all group border border-transparent hover:border-slate-100"
  >
    <div className="flex items-center gap-6 w-48 relative z-10">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl group-hover:bg-brand-500/10 transition-colors">
        {icon}
      </div>
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700 group-hover:text-slate-900 transition-colors">{name}</span>
    </div>
    <div className="flex flex-col items-center gap-1 w-20">
      <span className="text-slate-900 font-bold text-lg leading-none">{mentions}</span>
      <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Mentions</span>
    </div>
    <div className="flex flex-col items-center gap-1 w-20">
      <span className="text-slate-900 font-bold text-lg leading-none">{citations}K</span>
      <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Citations</span>
    </div>
  </motion.div>
);

const StatCard = ({ label, value, trend, color }: { label: string, value: string, trend: string, color: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`${color} p-6 rounded-2xl shadow-lg shadow-black/5 text-white relative overflow-hidden group cursor-pointer`}
  >
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{label}</p>
        <span className="text-[10px] font-bold px-2 py-1 bg-white/20 rounded-lg">
          {trend}
        </span>
      </div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
    </div>
    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
  </motion.div>
);

const SidebarItem = ({ icon, label, isOpen, active = false, onClick }: { icon: React.ReactNode, label: string, isOpen: boolean, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`
      flex items-center ${isOpen ? 'gap-3 px-4' : 'justify-center'} w-full py-3 rounded-xl transition-all duration-300 relative group
      ${active ? 'bg-brand-50 text-brand-500 shadow-sm' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-800'}
    `}
  >
    <div className={`flex-shrink-0 transition-colors duration-300 ${active ? 'text-brand-500' : 'group-hover:text-slate-600'}`}>{icon}</div>
    <AnimatePresence>
      {isOpen && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="text-xs font-bold whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </button>
);
