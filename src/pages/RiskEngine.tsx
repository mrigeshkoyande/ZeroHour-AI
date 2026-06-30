import { useState } from 'react';
import { 
  ShieldAlert, 
  TrendingDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RiskEngine() {
  const { deadlines, riskScore } = useApp();
  const [meetingReduction, setMeetingReduction] = useState(25);
  const [autoDelegate, setAutoDelegate] = useState(true);

  const simulatedScore = Math.max(10, Math.round(riskScore - (meetingReduction * 0.4) - (autoDelegate ? 12 : 0)));

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 md:p-8 rounded-[24px] border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
            <ShieldAlert className="w-4 h-4" /> Predictive Risk Radar
          </div>
          <h1 className="text-2xl md:text-3xl font-['Sora'] font-bold text-gray-900 mt-1">
            Deadline Risk Engine
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1.5 rounded-full border border-amber-200">
            48-Hour Collision Horizon Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Simulator */}
        <div className="col-span-12 md:col-span-6 xl:col-span-5 bg-white rounded-2xl border border-gray-200/80 p-5 md:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-6">
          <div>
            <h3 className="font-['Sora'] font-bold text-base text-gray-900">Live Risk Modulation</h3>
            <p className="text-xs text-gray-500 mt-0.5">Test real-time policy adjustments on your risk index</p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-emerald-50/50 border border-gray-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Simulated Index</span>
              <p className="text-3xl font-['Sora'] font-extrabold text-[#111827] mt-1">{simulatedScore}%</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold text-emerald-600 bg-white px-2.5 py-1 rounded-full shadow-sm border border-emerald-100 flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" /> -{riskScore - simulatedScore}% Reduction
              </span>
              <p className="text-[10px] text-gray-500 mt-1">SLA Safety Guaranteed</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-gray-700">Auto-Compress Meetings by</span>
                <span className="text-[#10B981] font-bold">{meetingReduction}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={meetingReduction}
                onChange={(e) => setMeetingReduction(Number(e.target.value))}
                className="w-full accent-[#10B981] h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-gray-400 mt-1">Converts 60m meetings into 45m focused blocks.</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs font-bold text-gray-800">Autonomous Delegation</p>
                <p className="text-[11px] text-gray-400">Route low-priority review PRs to backups</p>
              </div>
              <button 
                onClick={() => setAutoDelegate(!autoDelegate)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${autoDelegate ? 'bg-[#10B981]' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${autoDelegate ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <button 
            onClick={() => alert(`Applied mitigation policy! Risk score stabilized at ${simulatedScore}%.`)}
            className="w-full bg-[#10B981] hover:bg-[#064E3B] text-white font-['Sora'] text-xs font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform active:scale-95"
          >
            Apply Policy to Workspace
          </button>
        </div>

        {/* Right Active Risk Matrix */}
        <div className="col-span-12 md:col-span-6 xl:col-span-7 bg-white rounded-2xl border border-gray-200/80 p-5 md:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="font-['Sora'] font-bold text-lg text-gray-900">Collision Matrix</h3>
            <span className="text-xs font-semibold text-gray-400">Sorted by Severity</span>
          </div>

          <div className="space-y-4">
            {deadlines.map((d) => (
              <div 
                key={d.id}
                className={`p-5 rounded-2xl border transition-all ${
                  d.completed ? 'bg-gray-50/50 border-gray-100 opacity-60' : 'bg-white border-gray-200/80 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${d.riskLevel === 'critical' ? 'bg-red-500' : d.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-[#10B981]'}`} />
                      <h4 className="font-['Sora'] font-bold text-sm text-gray-900">{d.title}</h4>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{d.project} • Due {d.dueDate} ({d.dueTime})</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                      d.riskLevel === 'critical' ? 'bg-red-100 text-red-800' : d.riskLevel === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {d.riskScore}% Probability
                    </span>
                  </div>
                </div>

                {!d.completed && (
                  <div className="mt-4 bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs text-gray-700">
                    <span className="font-bold text-gray-900">Root Cause:</span> {d.reason}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
