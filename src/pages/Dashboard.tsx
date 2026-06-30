import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Sparkles, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  History,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { 
    deadlines, 
    suggestions, 
    events, 
    riskScore, 
    acceptSuggestion, 
    dismissSuggestion, 
    resolveDeadline
  } = useApp();
  
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<'Weekly' | 'Monthly'>('Weekly');

  const activeDeadlines = deadlines.filter(d => !d.completed);
  const criticalCount = activeDeadlines.filter(d => d.riskLevel === 'critical').length;

  // Mock bar heights for chart
  const weeklyBars = [
    { day: 'Mon', val: 60, score: '84%', active: false },
    { day: 'Tue', val: 75, score: '91%', active: false },
    { day: 'Wed', val: 45, score: '78%', active: false },
    { day: 'Thu', val: 90, score: '88%', active: false },
    { day: 'Today', val: 82, score: '94%', active: true },
    { day: 'Sat', val: 30, score: '98%', active: false },
    { day: 'Sun', val: 30, score: '95%', active: false },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Welcome Banner & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-white p-5 md:p-6 lg:p-8 rounded-2xl border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981] mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Autonomous Command Center
          </div>
          <h1 className="text-2xl md:text-4xl font-['Sora'] font-bold text-[#111827]">
            Welcome back, Alex.
          </h1>
          <p className="text-sm md:text-base text-[#6B7280] mt-1">
            Your schedule is <span className="font-bold text-[#10B981]">94% optimized</span> for today's high-priority deliverables.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/analytics')}
            className="flex items-center justify-center gap-2 bg-[#F8F9FA] hover:bg-gray-200/70 border border-gray-200 px-4 py-2.5 rounded-xl font-semibold text-xs text-gray-700 transition-all"
          >
            <History className="w-4 h-4 text-gray-500" />
            History
          </button>
          <button 
            onClick={() => navigate('/planner')}
            className="flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#064E3B] text-white px-5 py-2.5 rounded-xl font-semibold text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-transform"
          >
            <Plus className="w-4 h-4" />
            New AI Simulation
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Card 1: Today's Risk Score Gauge */}
        <div 
          onClick={() => navigate('/risk')}
          className="col-span-12 md:col-span-6 xl:col-span-4 bg-white rounded-2xl border border-gray-200/80 p-5 md:p-6 lg:p-7 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#10B981] via-amber-400 to-[#FB923C]" />
          
          <div className="flex items-center justify-between w-full mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Risk Index</span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Live Monitor</span>
          </div>

          <div className="relative w-44 h-44 flex items-center justify-center my-2">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-gray-100" cx="88" cy="88" fill="transparent" r="76" stroke="currentColor" strokeWidth="12" />
              <circle 
                className={`${riskScore > 60 ? 'text-red-500' : riskScore > 35 ? 'text-amber-500' : 'text-[#10B981]'} transition-all duration-1000`} 
                cx="88" cy="88" 
                fill="transparent" 
                r="76" 
                stroke="currentColor" 
                strokeDasharray="477.5" 
                strokeDashoffset={477.5 - (477.5 * riskScore) / 100} 
                strokeWidth="12" 
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-['Sora'] font-extrabold text-[#111827]">{riskScore}</span>
              <span className={`text-[11px] font-bold uppercase tracking-wider mt-0.5 ${riskScore > 60 ? 'text-red-600' : riskScore > 35 ? 'text-amber-600' : 'text-[#10B981]'}`}>
                {riskScore > 60 ? 'HIGH RISK' : riskScore > 35 ? 'MED RISK' : 'OPTIMAL'}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-600 px-2 leading-relaxed">
            {criticalCount > 0 
              ? `AI detected ${criticalCount} critical deadline conflict in your schedule. Auto-reschedule available.`
              : 'Zero active schedule bottlenecks. All investor meetings and sprints are safely buffered.'}
          </p>
          <span className="mt-4 text-xs font-bold text-[#10B981] group-hover:underline flex items-center gap-1">
            Open Risk Engine <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Card 2: Productivity Insights Bar Chart */}
        <div className="col-span-12 md:col-span-6 xl:col-span-8 bg-white rounded-2xl border border-gray-200/80 p-5 md:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-['Sora'] font-bold text-gray-900">Productivity & Focus Velocity</h3>
              <p className="text-xs text-gray-500 mt-0.5">Automated efficiency performance over the last 7 days</p>
            </div>
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as any)}
              className="bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold px-3 py-1.5 outline-none focus:border-emerald-500"
            >
              <option value="Weekly">Weekly Pulse</option>
              <option value="Monthly">Monthly Trend</option>
            </select>
          </div>

          {/* Interactive Bars */}
          <div className="h-56 w-full flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-2 border-b border-gray-100">
            {weeklyBars.map((b) => (
              <div key={b.day} className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold bg-gray-900 text-white px-2 py-0.5 rounded mb-1">
                  {b.score}
                </span>
                <div 
                  className={`w-full max-w-[44px] rounded-t-xl transition-all duration-500 ${
                    b.active 
                      ? 'bg-gradient-to-t from-[#10B981] to-[#34D399] shadow-lg shadow-emerald-500/20' 
                      : 'bg-gray-100 hover:bg-emerald-200/70'
                  }`}
                  style={{ height: `${b.val}%` }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs font-semibold text-gray-400 mt-3 px-1 sm:px-3">
            {weeklyBars.map(b => (
              <span key={b.day} className={b.active ? 'text-[#10B981] font-bold' : ''}>{b.day}</span>
            ))}
          </div>
        </div>

        {/* Card 3: Upcoming Predicted Deadlines */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-white rounded-2xl border border-gray-200/80 p-5 md:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-['Sora'] font-bold text-gray-900">Deadline Risk Radar</h3>
            </div>
            <button onClick={() => navigate('/risk')} className="text-xs font-bold text-[#10B981] hover:underline">View All ({activeDeadlines.length})</button>
          </div>

          <div className="space-y-3">
            {activeDeadlines.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200/60 flex items-center justify-between hover:bg-white hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-1.5 h-10 rounded-full ${item.riskLevel === 'critical' ? 'bg-red-500' : item.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-[#10B981]'}`} />
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1">{item.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{item.project} • Due {item.dueDate}, {item.dueTime}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    item.riskLevel === 'critical' ? 'bg-red-100 text-red-800' : item.riskLevel === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.riskLevel}
                  </span>
                  <button 
                    onClick={() => resolveDeadline(item.id)}
                    className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900"
                  >
                    Resolve →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: AI Suggestions Feed */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-white rounded-2xl border border-gray-200/80 p-5 md:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#10B981]" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#10B981]">Autonomous Suggestions</h3>
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{suggestions.length} ready</span>
            </div>

            {suggestions.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
                <p className="text-sm font-semibold">All suggestions cleared!</p>
                <p className="text-xs">ZeroHour AI is monitoring your workflows.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {suggestions.slice(0, 2).map((s) => (
                  <div key={s.id} className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-amber-50/30 border border-emerald-100/80">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-gray-900">{s.title}</p>
                      <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">{s.impact}</span>
                    </div>
                    <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">{s.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button 
                        onClick={() => acceptSuggestion(s.id)}
                        className="bg-[#10B981] hover:bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                      >
                        {s.actionText}
                      </button>
                      <button 
                        onClick={() => dismissSuggestion(s.id)}
                        className="bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card 5: Calendar Mini-Preview */}
        <div 
          onClick={() => navigate('/calendar')}
          className="col-span-12 md:col-span-12 xl:col-span-4 bg-white rounded-2xl border border-gray-200/80 p-5 md:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.03)] cursor-pointer hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-['Sora'] font-bold text-gray-900">Today's Blocks</h3>
              </div>
              <span className="text-xs font-bold text-gray-400">June 30</span>
            </div>

            <div className="space-y-2.5 mt-4">
              {events.slice(0, 3).map((ev) => (
                <div key={ev.id} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${ev.conflict ? 'bg-red-50/70 border-red-200' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="truncate">
                    <p className="font-semibold text-gray-800 truncate">{ev.title}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{ev.startTime} - {ev.endTime}</p>
                  </div>
                  {ev.conflict && (
                    <span className="text-[10px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded shrink-0">Conflict</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#10B981]">
            <span>Full Calendar View</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* Footer Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
        <div className="bg-white p-4.5 md:p-5 rounded-2xl border border-gray-200/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#10B981]">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-['Sora'] font-bold text-gray-900">1.2s</p>
            <p className="text-xs text-gray-500 font-medium">Predictive Latency</p>
          </div>
        </div>
        <div className="bg-white p-4.5 md:p-5 rounded-2xl border border-gray-200/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-['Sora'] font-bold text-gray-900">99.9%</p>
            <p className="text-xs text-gray-500 font-medium">System Reliability</p>
          </div>
        </div>
        <div className="bg-white p-4.5 md:p-5 rounded-2xl border border-gray-200/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-['Sora'] font-bold text-gray-900">148</p>
            <p className="text-xs text-gray-500 font-medium">Auto-Fixes Today</p>
          </div>
        </div>
      </div>

    </div>
  );
}
