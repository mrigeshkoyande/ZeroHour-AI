import { useState, useEffect } from 'react';
import { 
  TrendingDown,
  Clock,
  Share2,
  AlertTriangle,
  ChevronRight,
  BatteryCharging,
  Sparkles,
  Send,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RiskEngine() {
  const { riskScore } = useApp();
  const [meetingReduction, setMeetingReduction] = useState(25);
  const [autoDelegate, setAutoDelegate] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 'm1', sender: 'ai', text: "Risk hit 87% because of the added meeting at 3 PM. Should I suggest a delegate?" },
    { id: 'm2', sender: 'user', text: "Yes, please look at Sarah's availability for that." }
  ]);

  const simulatedScore = Math.max(10, Math.round(riskScore - (meetingReduction * 0.4) - (autoDelegate ? 12 : 0)));

  // Countdown timer logic
  const [countdown, setCountdown] = useState('02:14:35:08');
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      // Target is Friday at 5 PM
      const target = new Date();
      const dayOffset = (5 - target.getDay() + 7) % 7;
      target.setDate(target.getDate() + (dayOffset === 0 && target.getHours() >= 17 ? 7 : dayOffset));
      target.setHours(17, 0, 0, 0);

      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown('00:00:00:00');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = { id: 'user_' + Date.now(), sender: 'user', text: chatInput.trim() };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');
    
    // Simple mock response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: `Understood. Running simulation for Sarah's delegate capacity. Her current cognitive reserve is at 74%—allocating block.`
      }]);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 flex flex-col h-full">
      
      {/* Floating Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-5 md:p-6 rounded-2xl border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] shrink-0">
        <div>
          <nav className="flex items-center gap-1.5 text-gray-400 text-xs mb-1.5 font-medium">
            <span>Projects</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#10B981] font-bold">Horizon Q4 Release</span>
          </nav>
          <h2 className="text-xl md:text-3xl font-['Sora'] font-bold text-gray-900">Risk Analysis Engine</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Next Milestone Countdown</span>
            <div className="text-xl md:text-2xl font-bold text-[#10B981] font-mono mt-0.5 tracking-wider">{countdown}</div>
          </div>
          <button className="p-2.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Grid: Circular Gauge + Probability Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 shrink-0">
        
        {/* Risk Score Circle Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-200/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <h3 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">Today's Risk Index</h3>
          
          <div className="relative w-56 h-56 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="112" cy="112" fill="transparent" r="96" stroke="#f3f4f5" strokeWidth="14"></circle>
              <circle 
                className="transition-all duration-1000" 
                cx="112" cy="112" 
                fill="transparent" 
                r="96" 
                stroke="url(#riskGradient)" 
                strokeDasharray="603" 
                strokeDashoffset={603 - (603 * riskScore) / 100} 
                strokeLinecap="round" 
                strokeWidth="14"
              ></circle>
              <defs>
                <linearGradient id="riskGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#f59e0b' }}></stop>
                  <stop offset="100%" style={{ stopColor: '#ef4444' }}></stop>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-['Sora'] font-extrabold text-gray-900">{riskScore}%</span>
              <span className={`text-[10px] font-bold tracking-widest uppercase mt-0.5 ${riskScore > 60 ? 'text-red-600' : 'text-amber-500'}`}>
                {riskScore > 60 ? 'High Risk' : 'Medium Risk'}
              </span>
            </div>
          </div>
          
          <p className="mt-6 text-xs text-gray-500 text-center px-4 leading-relaxed">
            Probability of missing the Friday 5PM milestone has increased by 14% since morning standup.
          </p>
        </div>

        {/* Timeline & Probability Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-['Sora'] font-bold text-gray-900">Timeline &amp; Probability</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span> Estimated
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Target
              </span>
            </div>
          </div>

          <div className="flex-1 w-full relative min-h-[180px] flex items-end justify-between px-2 pt-6">
            <div className="w-[12%] bg-gray-100 rounded-t-xl h-[40%] hover:h-[45%] transition-all cursor-pointer group relative">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">Mon</div>
            </div>
            <div className="w-[12%] bg-gray-100 rounded-t-xl h-[55%] hover:h-[60%] transition-all cursor-pointer group relative">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">Tue</div>
            </div>
            <div className="w-[12%] bg-gray-100 rounded-t-xl h-[50%] hover:h-[55%] transition-all cursor-pointer group relative">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">Wed</div>
            </div>
            <div className="w-[12%] bg-[#10B981] rounded-t-xl h-[75%] hover:h-[80%] transition-all cursor-pointer group relative">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">Today</div>
            </div>
            <div className="w-[12%] bg-red-100 border-t-2 border-dashed border-red-500 h-[90%] relative group">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">Deadline</div>
            </div>
            <div className="w-[12%] bg-gray-50 h-[95%]"></div>
            <div className="w-[12%] bg-gray-50 h-[100%]"></div>
          </div>

          <div className="mt-6 flex justify-between items-center text-xs font-bold text-gray-400 pt-4 border-t border-gray-100">
            <span>Current Progress: 62%</span>
            <span>Confidence: 74% (Gemini Insight)</span>
          </div>
        </div>
      </section>

      {/* Live Modulation Slider */}
      <section className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div>
            <h3 className="font-['Sora'] font-bold text-base text-gray-900">Live Risk Modulation</h3>
            <p className="text-xs text-gray-500 mt-0.5">Test real-time policy adjustments on your risk index</p>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-700">Auto-Compress Meetings by</span>
                <span className="text-[#10B981]">{meetingReduction}%</span>
              </div>
              <input 
                type="range" min="0" max="60" step="5"
                value={meetingReduction} 
                onChange={(e) => setMeetingReduction(Number(e.target.value))}
                className="w-full accent-[#10B981]"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">Auto-Delegate Overdue Blocks</span>
              <button 
                onClick={() => setAutoDelegate(!autoDelegate)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${autoDelegate ? 'bg-[#10B981]' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${autoDelegate ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-emerald-50/50 p-6 rounded-2xl border border-gray-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Simulated Index</span>
            <p className="text-3xl font-['Sora'] font-extrabold text-gray-900 mt-1">{simulatedScore}%</p>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-bold text-emerald-600 bg-white px-2.5 py-1 rounded-full shadow-sm border border-emerald-100 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" /> -{riskScore - simulatedScore}% Reduction
            </span>
            <p className="text-[10px] text-gray-500 mt-1 font-semibold">SLA Safety Guaranteed</p>
          </div>
        </div>
      </section>

      {/* Reason Cards: Bento Grid Style */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-red-50 text-red-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider">Schedule Density</h4>
          </div>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">3 back-to-back meetings detected tomorrow between 10 AM and 2 PM.</p>
          <div className="flex items-center justify-between text-xs font-bold pt-3 border-t border-gray-50">
            <span className="text-red-500">+22% Risk Weight</span>
            <button className="text-[#10B981] hover:underline">Reschedule</button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <BatteryCharging className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider">Energy Forecast</h4>
          </div>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">Low energy dip predicted for Thursday afternoon based on historical output.</p>
          <div className="flex items-center justify-between text-xs font-bold pt-3 border-t border-gray-50">
            <span className="text-amber-600">+8% Risk Weight</span>
            <button className="text-[#10B981] hover:underline">Mitigate</button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider">Dependency Lag</h4>
          </div>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">Final assets from Design Team are currently 4 hours overdue.</p>
          <div className="flex items-center justify-between text-xs font-bold pt-3 border-t border-gray-50">
            <span className="text-gray-500">+15% Risk Weight</span>
            <button className="text-[#10B981] hover:underline">Nudge Team</button>
          </div>
        </div>
      </section>

      {/* Suggested Actions CTA */}
      <section className="bg-white rounded-2xl border-2 border-emerald-100 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] bg-gradient-to-br from-white to-emerald-50/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981] text-white text-[10px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> AI Recommended
          </div>
          <h3 className="text-lg font-['Sora'] font-bold text-gray-900 mb-2">Recovery Plan Available</h3>
          <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">
            Based on your risk profile, I can automatically block your Thursday morning for deep work and draft status updates for your stakeholders to buy 4 more hours.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <button 
            onClick={() => alert(`Activated recovery plan! Staged calendar blocks on Thursday.`)}
            className="bg-[#10B981] hover:bg-emerald-600 text-white font-['Sora'] text-xs font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            Activate Recovery
          </button>
          <button className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-5 py-3 rounded-xl hover:bg-gray-50 transition-colors">
            Dismiss
          </button>
        </div>
      </section>

      {/* Secondary Insights: Historical Benchmarking & Predictive Chat */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Historical Benchmarking */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-['Sora'] font-bold text-sm text-gray-900">Historical Benchmarking</h4>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">Finished On-Time</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60 h-48 flex items-center justify-center relative overflow-hidden">
            {/* Timeline Comparison Visual */}
            <div className="absolute inset-0 flex flex-col justify-around p-6">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-gray-400">
                  <span>Project Alpha (Baseline)</span>
                  <span className="text-emerald-600">62h total</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#10B981] h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-gray-400">
                  <span>Project Horizon (Current)</span>
                  <span className="text-amber-500">42h elapsed (High Deviation)</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full animate-pulse" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Chat Panel */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between h-64">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <h4 className="font-['Sora'] font-bold text-sm text-gray-900">Predictive Risk Chat</h4>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs mb-3 scroll-hide">
            {chatMessages.map((m) => (
              <div key={m.id} className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                )}
                <div className={`p-2.5 rounded-xl max-w-[80%] leading-relaxed ${m.sender === 'user' ? 'bg-[#10B981] text-white rounded-tr-none font-medium' : 'bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="relative shrink-0">
            <input 
              type="text"
              placeholder="Ask AI about this risk..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all text-xs"
            />
            <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#10B981] hover:text-emerald-700 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </section>

    </div>
  );
}
