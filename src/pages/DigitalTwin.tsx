import { useState } from 'react';
import { 
  Activity, 
  Sparkles, 
  Brain, 
  BatteryCharging, 
  Zap,
  AlertTriangle,
  Moon,
  ChevronRight,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DigitalTwin() {
  const { focusMode } = useApp();
  const [energyBonus, setEnergyBonus] = useState(0);
  const [meditating, setMeditating] = useState(false);
  const [pathMode, setPathMode] = useState<'optimized' | 'default'>('optimized');

  const cognitiveLoad = Math.max(30, 72 - (focusMode ? 15 : 0) - energyBonus);
  const focusVelocity = Math.min(99, 84 + (focusMode ? 10 : 0) + energyBonus);

  const handleDecompress = () => {
    setMeditating(true);
    setTimeout(() => {
      setEnergyBonus(prev => prev + 12);
      setMeditating(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 h-full flex flex-col">
      
      {/* Header / Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 md:p-6 rounded-2xl border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] shrink-0">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981]">
            <Activity className="w-4 h-4 animate-pulse" /> Real-Time Biometric & Cognitive Twin
          </div>
          <h1 className="text-xl md:text-3xl font-['Sora'] font-bold text-gray-900 mt-1">
            Life Digital Twin
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Real-time synchronization between current state and predicted evolution.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Twin Online</span>
          </div>
          <button 
            onClick={handleDecompress}
            disabled={meditating}
            className="bg-gradient-to-r from-[#10B981] to-[#064E3B] hover:opacity-90 text-white font-['Sora'] text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Zap className={`w-3.5 h-3.5 ${meditating ? 'animate-bounce' : ''}`} />
            {meditating ? 'Neurological Decompress...' : 'Decompress'}
          </button>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 relative">
        
        {/* LEFT: Current Schedule */}
        <section className="col-span-12 lg:col-span-6 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-['Sora'] font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              Current Reality
            </h2>
            <span className="text-xs font-bold text-gray-400">Tuesday, Oct 24</span>
          </div>

          {/* Timeline Items */}
          <div className="space-y-6 relative pl-6 border-l-2 border-gray-100 ml-3 py-2">
            
            {/* Past Task */}
            <div className="relative opacity-60">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-4 border-white bg-gray-400"></div>
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200/40">
                <p className="text-[10px] font-bold text-gray-400 mb-1">08:00 AM - 09:30 AM</p>
                <h3 className="text-xs font-bold text-gray-800">Morning Standup & Deep Work</h3>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-semibold text-gray-500 rounded">Focus</span>
                </div>
              </div>
            </div>

            {/* Current Task */}
            <div className="relative scale-[1.02] origin-left">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-4 border-white bg-[#10B981] shadow-lg shadow-emerald-500/50"></div>
              <div className="bg-emerald-50/40 p-5 rounded-xl border border-emerald-100 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1">NOW: 10:15 AM • Load: {cognitiveLoad}%</p>
                    <h3 className="text-sm font-bold text-gray-900 font-['Sora']">Product Strategy Phase II</h3>
                  </div>
                  <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                    <Zap className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full transition-all duration-500" style={{ width: `${100 - cognitiveLoad}%` }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 shrink-0">45m left</span>
                </div>
              </div>
            </div>

            {/* Upcoming Task */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-4 border-white bg-gray-400"></div>
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200/40">
                <p className="text-[10px] font-bold text-gray-400 mb-1">11:30 AM - 12:30 PM</p>
                <h3 className="text-xs font-bold text-gray-800">Client Presentation</h3>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded">Critical</span>
                  <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-semibold text-gray-500 rounded">External</span>
                </div>
              </div>
            </div>

            {/* Lunch */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-4 border-white bg-gray-400"></div>
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200/40">
                <p className="text-[10px] font-bold text-gray-400 mb-1">12:30 PM</p>
                <h3 className="text-xs font-bold text-gray-800">Lunch Break</h3>
              </div>
            </div>

          </div>
        </section>

        {/* RIGHT: Predicted Future */}
        <section className="col-span-12 lg:col-span-6 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-y-auto relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-['Sora'] font-bold text-gray-900 flex items-center gap-2">
                <Brain className="w-4 h-4 text-amber-500" />
                Predicted Evolution
              </h2>
              <div className="flex gap-1.5 bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => setPathMode('optimized')}
                  className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-all ${pathMode === 'optimized' ? 'bg-white text-emerald-950 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Optimized
                </button>
                <button 
                  onClick={() => setPathMode('default')}
                  className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-all ${pathMode === 'default' ? 'bg-white text-emerald-950 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Default
                </button>
              </div>
            </div>

            {/* Energy Level Graph (Mockup using custom responsive bars) */}
            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-200/60 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Predictive Energy Flux</span>
                <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">{focusVelocity}% Reserve</span>
              </div>
              <div className="h-28 flex items-end gap-2.5 px-1 pt-6 border-b border-gray-100">
                <div className="flex-1 bg-emerald-500/20 rounded-t h-[60%] hover:bg-emerald-500 transition-colors cursor-pointer relative group">
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">60%</span>
                </div>
                <div className="flex-1 bg-emerald-500/20 rounded-t h-[55%] hover:bg-emerald-500 transition-colors cursor-pointer relative group">
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">55%</span>
                </div>
                <div className="flex-1 bg-emerald-500/20 rounded-t h-[70%] hover:bg-emerald-500 transition-colors cursor-pointer relative group">
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">70%</span>
                </div>
                <div className="flex-1 bg-emerald-500/20 rounded-t h-[85%] hover:bg-emerald-500 transition-colors cursor-pointer relative group">
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">85%</span>
                </div>
                <div className="flex-1 bg-emerald-500/40 rounded-t h-[90%] hover:bg-emerald-500 transition-colors cursor-pointer relative group">
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">90%</span>
                </div>
                <div className="flex-1 bg-[#10B981] rounded-t relative group transition-all duration-500" style={{ height: `${focusVelocity}%` }}>
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">{focusVelocity}%</span>
                </div>
                <div className="flex-1 bg-amber-500/40 rounded-t h-[72%] animate-pulse relative group">
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">72%</span>
                </div>
                <div className="flex-1 bg-amber-500/40 rounded-t h-[50%] animate-pulse relative group">
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">50%</span>
                </div>
                <div className="flex-1 bg-amber-500/40 rounded-t h-[35%] animate-pulse relative group">
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">35%</span>
                </div>
              </div>
              <div className="flex justify-between mt-2.5 px-1 text-[10px] text-gray-400 font-bold">
                <span>08:00</span>
                <span>12:00</span>
                <span className="text-[#10B981]">15:00 (Predicted Dip)</span>
                <span>20:00</span>
              </div>
            </div>

            {/* Conflict Alerts */}
            <div className="space-y-3 mb-6">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Detected Conflicts</h4>
              
              <div className="p-4 rounded-xl border border-red-100 bg-red-50/20 flex gap-3.5 items-start">
                <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-700">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Sleep Deficit Prediction</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">If current schedule holds, tonight's sleep window will be 5.2h. Impact: -12% cognitive performance tomorrow.</p>
                  <button className="mt-2 text-[#10B981] font-bold text-[11px] flex items-center gap-1 hover:underline">
                    Mitigate Risk <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/20 flex gap-3.5 items-start">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
                  <BatteryCharging className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Double Booking Risk</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">16:30 Meeting conflicts with predicted focus block. Simulation suggests moving focus block to 18:00.</p>
                  <button className="mt-2 text-amber-700 font-bold text-[11px] flex items-center gap-1 hover:underline">
                    Reschedule Block <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sleep Impact Card */}
          <div className="p-5 rounded-2xl bg-gray-900 text-white flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Sleep Recovery Score</p>
              <h3 className="text-xl font-bold font-['Sora']">92 / 100</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed max-w-[240px] mt-1">Deep sleep phase predicted to increase by 14m if "Wind Down" starts at 21:30.</p>
            </div>
            <div className="p-3 bg-white/10 rounded-xl text-amber-300">
              <Moon className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* MIDDLE: AI Floating Recommendations */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden lg:flex flex-col items-center gap-5">
          {/* Avatar Placeholder */}
          <div className="w-24 h-24 rounded-full bg-white border border-emerald-100 shadow-xl flex items-center justify-center relative animate-pulse pointer-events-auto bg-gradient-to-tr from-white to-emerald-50/60">
            <div className="absolute inset-0 rounded-full animate-spin-slow border-2 border-dashed border-emerald-400/30"></div>
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-[#10B981]">
              <Brain className="w-8 h-8" />
            </div>
          </div>
          <div className="space-y-2 pointer-events-auto flex flex-col items-center">
            <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-md border border-emerald-100 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[10px] font-bold text-gray-800 whitespace-nowrap">Take 5m breathing break now</span>
            </div>
            <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-md border border-amber-100 flex items-center gap-2">
              <BatteryCharging className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-bold text-gray-800 whitespace-nowrap font-medium">Hydration levels dropping</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
