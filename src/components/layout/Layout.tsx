import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  CheckSquare, 
  BrainCircuit, 
  ShieldAlert, 
  Activity, 
  MessageSquare, 
  BarChart3, 
  Settings as SettingsIcon, 
  Search, 
  Bell, 
  Sparkles, 
  ShieldCheck, 
  Flame,
  X,
  Mail
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Layout() {
  const { 
    riskScore, 
    focusMode, 
    toggleFocusMode, 
    googleConnected, 
    gmailConnected, 
    toggleGoogleConnection, 
    toggleGmailConnection,
    activeRecoveryMode,
    exitSOSRecovery
  } = useApp();
  
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotInput, setCopilotInput] = useState('');
  const [copilotResponse, setCopilotResponse] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navigate = useNavigate();

  const navItems = [
    { name: 'Command Center', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Smart Calendar', path: '/calendar', icon: CalendarIcon },
    { name: 'AI Planner & Tasks', path: '/planner', icon: CheckSquare },
    { name: 'Deadline Risk Engine', path: '/risk', icon: ShieldAlert, badge: riskScore > 50 ? `${riskScore}% Risk` : undefined, badgeColor: riskScore > 50 ? 'bg-amber-500 text-white' : undefined },
    { name: 'Life Digital Twin', path: '/twin', icon: Activity },
    { name: 'SOS Recovery Shield', path: '/sos', icon: Flame, highlight: true },
    { name: 'Gemini Copilot', path: '/chat', icon: MessageSquare },
    { name: 'Productivity Pulse', path: '/analytics', icon: BarChart3 },
    { name: 'System Settings', path: '/settings', icon: SettingsIcon },
  ];

  const handleCopilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotInput.trim()) return;
    const q = copilotInput.trim();
    setCopilotInput('');
    setCopilotResponse('Thinking...');
    setTimeout(() => {
      if (q.toLowerCase().includes('reschedule') || q.toLowerCase().includes('meeting')) {
        setCopilotResponse('Moved your 2:00 PM stakeholder sync to 4:30 PM. 90 minutes of deep work unlocked.');
      } else if (q.toLowerCase().includes('email') || q.toLowerCase().includes('gmail')) {
        setCopilotResponse('Drafted replies for 14 vendor inquiries in Gmail using formal tone.');
      } else {
        setCopilotResponse(`Analyzed "${q}". ZeroHour AI recommends allocating 45 mins in your morning schedule to clear pending review bottlenecks.`);
      }
    }, 800);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#F8F9FA] text-[#191C1D] flex flex-col font-['Inter'] selection:bg-emerald-500/20 selection:text-emerald-950">
      
      {/* SOS Recovery Mode Global Bar if Active */}
      {activeRecoveryMode && (
        <div className="w-full bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-700 text-white px-6 py-2.5 flex items-center justify-between shadow-lg shrink-0 z-50">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-amber-300 animate-bounce" />
            <span className="font-['Sora'] font-bold text-sm tracking-wide">SOS RECOVERY SHIELD ACTIVE</span>
            <span className="text-xs bg-black/30 px-3 py-1 rounded-full text-emerald-200 hidden sm:inline">Non-essential alerts muted • Calendar protected</span>
          </div>
          <button 
            onClick={exitSOSRecovery}
            className="text-xs font-semibold bg-white text-emerald-900 px-4 py-1.5 rounded-full hover:bg-emerald-50 transition-all shadow-md"
          >
            Exit SOS Mode
          </button>
        </div>
      )}

      {/* Main Side-by-Side App Grid */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="hidden md:flex md:w-64 lg:w-72 bg-[#F8F9FA] border-r border-[#bbcabf]/30 flex flex-col shrink-0 z-40 h-full">
          {/* Logo & Workspace */}
          <div className="p-5 border-b border-[#bbcabf]/20 flex items-center justify-between shrink-0">
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#006c49] flex items-center justify-center text-white shadow-md shadow-emerald-500/10 group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-['Sora'] font-extrabold text-base tracking-tight text-[#006c49]">ZeroHour AI</span>
              </div>
              <p className="text-[10px] text-gray-500 font-bold tracking-wider">
                Gemini Connected
              </p>
            </div>
          </div>
        </div>

          {/* Quick Focus Mode Switch */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className={`w-4 h-4 ${focusMode ? 'text-emerald-600' : 'text-gray-400'}`} />
              <span className="text-xs font-semibold text-gray-700">Focus Shield</span>
            </div>
            <button 
              onClick={toggleFocusMode}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${focusMode ? 'bg-[#10B981]' : 'bg-gray-300'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${focusMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          {focusMode && (
            <p className="text-[11px] text-emerald-700 mt-1.5 flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3" /> AI blocking 8 low-priority pings
            </p>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Navigation</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#10B981] text-[#00422b] scale-[0.98] shadow-md shadow-emerald-500/10'
                      : item.highlight
                      ? 'text-amber-600 bg-amber-50/80 hover:bg-amber-100/80'
                      : 'text-[#3c4a42] hover:bg-gray-200/50 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : item.highlight ? 'text-amber-600' : 'text-gray-500'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-emerald-100 text-emerald-800'}`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

          {/* Live Integrations Status Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/80 m-4 rounded-2xl shrink-0">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Live Sync</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span> Active
            </span>
          </div>
          <div className="space-y-2">
            <div 
              onClick={toggleGoogleConnection}
              className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200/80 cursor-pointer hover:border-emerald-500 transition-colors"
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-medium text-gray-700">Google Calendar</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${googleConnected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
            </div>
            <div 
              onClick={toggleGmailConnection}
              className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200/80 cursor-pointer hover:border-emerald-500 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-500" />
                <span className="text-xs font-medium text-gray-700">Gmail VIP Inbox</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${gmailConnected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 px-6 md:px-8 flex items-center justify-between shrink-0 z-30">
          
          {/* Quick Search */}
          <div className="flex items-center gap-3">
            {/* Large search input for sm and up */}
            <div 
              onClick={() => setQuickSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-[#f3f4f5] hover:bg-[#edeeef] text-gray-500 px-4 py-2 rounded-full cursor-pointer transition-colors w-72 sm:w-96 border border-[#bbcabf]/30"
            >
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-xs font-medium truncate">Search insights, tasks, or projections...</span>
              <span className="ml-auto text-[10px] font-mono bg-white px-1.5 py-0.5 rounded text-gray-450 border border-gray-200 hidden sm:inline">⌘K</span>
            </div>
            {/* Icon-only search button for mobile */}
            <button 
              onClick={() => setQuickSearchOpen(true)}
              className="flex sm:hidden w-9 h-9 rounded-full bg-gray-50 border border-gray-200 items-center justify-center text-gray-600 hover:bg-emerald-50 hover:text-[#10B981] transition-colors"
            >
              <Search className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-5">
            {/* AI Status Pill */}
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-full">
              <BrainCircuit className="w-4 h-4 text-emerald-600 animate-spin-slow" />
              <span className="text-xs font-semibold text-emerald-900">Gemini 3.1 Pro Live</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-white px-2 py-0.5 rounded-full border border-emerald-100">1.1s latency</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FB923C] ring-2 ring-white"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="font-['Sora'] font-bold text-sm text-gray-900">Live AI Alerts</span>
                    <span className="text-[11px] text-emerald-600 font-semibold cursor-pointer">Clear all</span>
                  </div>
                  <div className="py-3 space-y-3">
                    <div className="flex gap-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Schedule Collision Risk</p>
                        <p className="text-gray-500 mt-0.5">Q3 Financial Audit collides with internal review.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Inbox Zero Maintained</p>
                        <p className="text-gray-500 mt-0.5">Gemini auto-categorized 28 incoming emails.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile avatar */}
            <div className="flex items-center gap-3 pl-5 border-l border-[#bbcabf]/30">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-gray-900 leading-tight">Alex Rivera</p>
                <p className="text-[10px] text-[#006C49] flex items-center justify-end gap-1 font-bold">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></span>
                  Gemini Connected
                </p>
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-[#10B981]/30 p-0.5 shadow-md bg-white">
                <div className="w-full h-full rounded-full bg-[#10B981]/10 flex items-center justify-center font-['Sora'] font-bold text-xs text-[#006c49]">
                  AR
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24 md:pb-8 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="bg-white/95 backdrop-blur-md border-t border-gray-150 p-2.5 flex justify-around items-center md:hidden shadow-lg shrink-0">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-[#10B981]'
                      : 'text-gray-400 hover:text-gray-600'
                  }`
                }
              >
                <Icon className="w-4.5 h-4.5" />
                <span>{item.name.split(' ')[0]}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      </div>

      {/* Quick Search Modal */}
      {quickSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-emerald-600" />
              <input 
                autoFocus
                type="text"
                placeholder="Ask Gemini anything or search tasks, meetings, people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm outline-none bg-transparent placeholder-gray-400 font-medium"
              />
              <button 
                onClick={() => setQuickSearchOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-gray-50 space-y-3 max-h-96 overflow-y-auto">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Quick Actions</p>
              <div 
                onClick={() => { setQuickSearchOpen(false); navigate('/planner'); }}
                className="p-3 rounded-xl bg-white border border-gray-200 hover:border-emerald-500 cursor-pointer flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-800">Optimize Today's Remaining Schedule</span>
                </div>
                <span className="text-xs text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Execute →</span>
              </div>
              <div 
                onClick={() => { setQuickSearchOpen(false); navigate('/risk'); }}
                className="p-3 rounded-xl bg-white border border-gray-200 hover:border-emerald-500 cursor-pointer flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-gray-800">Analyze Q3 Financial Audit Risk</span>
                </div>
                <span className="text-xs text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">View Risk →</span>
              </div>
              <div 
                onClick={() => { setQuickSearchOpen(false); navigate('/sos'); }}
                className="p-3 rounded-xl bg-white border border-gray-200 hover:border-emerald-500 cursor-pointer flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-800">Trigger 15-Minute Cognitive Decompression</span>
                </div>
                <span className="text-xs text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Activate →</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Gemini Copilot Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!copilotOpen ? (
          <button
            onClick={() => setCopilotOpen(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-[#10B981] to-[#064E3B] text-white px-5 py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-400/30 group"
          >
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
            <span className="font-['Sora'] font-bold text-sm tracking-wide">Ask Gemini OS</span>
          </button>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-80 sm:w-96 p-5 space-y-4 animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-['Sora'] font-bold text-sm text-gray-900">Gemini OS Copilot</h4>
                  <p className="text-[10px] text-emerald-600 font-medium">Predictive Productivity Engine</p>
                </div>
              </div>
              <button 
                onClick={() => setCopilotOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {copilotResponse && (
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-xs text-emerald-950 font-medium leading-relaxed">
                {copilotResponse}
              </div>
            )}

            <form onSubmit={handleCopilotSubmit} className="space-y-3">
              <input 
                type="text"
                placeholder="Ask to reschedule, summarize emails, or fix conflicts..."
                value={copilotInput}
                onChange={(e) => setCopilotInput(e.target.value)}
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-medium">Press Enter to run AI command</span>
                <button 
                  type="submit"
                  className="bg-[#10B981] text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-sm hover:bg-emerald-600 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}
