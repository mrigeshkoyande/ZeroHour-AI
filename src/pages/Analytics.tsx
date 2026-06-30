import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp
} from 'lucide-react';
import { PRODUCTIVITY_ANALYTICS } from '../lib/mockData';

export default function Analytics() {
  const [view, setView] = useState<'Weekly' | 'Monthly'>('Weekly');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 md:p-8 rounded-[24px] border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981]">
            <BarChart3 className="w-4 h-4" /> Autonomous Performance Telemetry
          </div>
          <h1 className="text-2xl md:text-3xl font-['Sora'] font-bold text-gray-900 mt-1">
            Productivity Pulse & Analytics
          </h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setView('Weekly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'Weekly' ? 'bg-[#10B981] text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}
          >
            Weekly Pulse
          </button>
          <button 
            onClick={() => setView('Monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'Monthly' ? 'bg-[#10B981] text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}
          >
            Monthly Overview
          </button>
        </div>
      </div>

      {/* Top Benchmark KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[24px] border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
          <span className="text-xs font-bold text-gray-400 uppercase">Focus Velocity Avg</span>
          <p className="text-3xl font-['Sora'] font-extrabold text-[#111827] mt-2">89.4%</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14% vs industry founders
          </p>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
          <span className="text-xs font-bold text-gray-400 uppercase">Deep Work Saved</span>
          <p className="text-3xl font-['Sora'] font-extrabold text-[#10B981] mt-2">18.5 hrs</p>
          <p className="text-xs text-gray-500 mt-1">This week via AI defragmentation</p>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
          <span className="text-xs font-bold text-gray-400 uppercase">Collisions Prevented</span>
          <p className="text-3xl font-['Sora'] font-extrabold text-[#FB923C] mt-2">12</p>
          <p className="text-xs text-gray-500 mt-1">Zero deadline breaches</p>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
          <span className="text-xs font-bold text-gray-400 uppercase">AI Accuracy</span>
          <p className="text-3xl font-['Sora'] font-extrabold text-blue-600 mt-2">99.8%</p>
          <p className="text-xs text-gray-500 mt-1">Gemini predictive confidence</p>
        </div>
      </div>

      {/* Main Bar Chart */}
      <div className="bg-white rounded-[24px] border border-gray-200/80 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
        <h3 className="font-['Sora'] font-bold text-lg text-gray-900 mb-6">Daily Cognitive Breakdown (Focus vs Meeting Load)</h3>
        
        <div className="space-y-4">
          {PRODUCTIVITY_ANALYTICS.map((item) => (
            <div key={item.day} className="flex items-center gap-4 text-xs">
              <span className="w-12 font-bold text-gray-700">{item.day}</span>
              <div className="flex-1 bg-gray-100 h-6 rounded-xl overflow-hidden flex">
                <div 
                  className="bg-gradient-to-r from-[#10B981] to-[#34D399] h-full flex items-center px-2 text-white font-bold text-[10px]" 
                  style={{ width: `${item.focusScore}%` }}
                >
                  {item.focusScore}% Focus
                </div>
              </div>
              <span className="w-24 text-gray-500 font-medium text-right">{item.meetings}h meetings</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
