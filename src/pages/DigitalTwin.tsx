import { useState } from 'react';
import { 
  Activity, 
  Sparkles, 
  Brain, 
  BatteryCharging, 
  HeartPulse, 
  ShieldCheck, 
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DigitalTwin() {
  const { focusMode } = useApp();
  const [energyBonus, setEnergyBonus] = useState(0);
  const [meditating, setMeditating] = useState(false);

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
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 md:p-8 rounded-[24px] border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981]">
            <Activity className="w-4 h-4" /> Real-Time Biometric & Cognitive Twin
          </div>
          <h1 className="text-2xl md:text-3xl font-['Sora'] font-bold text-gray-900 mt-1">
            Life Digital Twin
          </h1>
        </div>
        <button 
          onClick={handleDecompress}
          disabled={meditating}
          className="bg-gradient-to-r from-[#10B981] to-[#064E3B] hover:opacity-90 text-white font-['Sora'] text-xs font-bold px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
        >
          <Zap className={`w-4 h-4 ${meditating ? 'animate-bounce' : ''}`} />
          {meditating ? 'Simulating Neurological Decompress...' : 'Inject 15-Min Decompression Block'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cognitive Load</span>
            <Brain className="w-5 h-5 text-amber-500" />
          </div>
          <div className="my-6">
            <span className="text-4xl font-['Sora'] font-extrabold text-[#111827]">{cognitiveLoad}%</span>
            <p className="text-xs text-emerald-600 font-semibold mt-1">Optimal Operating Zone</p>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#10B981] to-amber-500 h-full transition-all duration-500" style={{ width: `${cognitiveLoad}%` }} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Focus Velocity</span>
            <BatteryCharging className="w-5 h-5 text-[#10B981]" />
          </div>
          <div className="my-6">
            <span className="text-4xl font-['Sora'] font-extrabold text-[#111827]">{focusVelocity}%</span>
            <p className="text-xs text-emerald-600 font-semibold mt-1">Peak Flow State</p>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#10B981] h-full transition-all duration-500" style={{ width: `${focusVelocity}%` }} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Burnout Horizon</span>
            <HeartPulse className="w-5 h-5 text-red-500" />
          </div>
          <div className="my-6">
            <span className="text-4xl font-['Sora'] font-extrabold text-[#111827]">14 Days</span>
            <p className="text-xs text-gray-500 font-medium mt-1">Safe Runway (Zero Fatigue Risk)</p>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: '85%' }} />
          </div>
        </div>

      </div>

      {/* Deep Twin Analytics Box */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 md:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
        <h3 className="font-['Sora'] font-bold text-lg text-gray-900 mb-4">Autonomous Twin Insights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
              <Sparkles className="w-4 h-4 text-[#10B981]" /> Circadian Peak Window
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Your neurological efficiency peaks between 09:30 AM and 11:45 AM. ZeroHour automatically places heavy architectural planning inside this slot.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Meeting Drag Prevention
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Back-to-back meetings over 90 mins trigger a 24% drop in decision accuracy. AI inserts mandatory 10-minute buffers.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
