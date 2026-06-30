import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  Users, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Calendar() {
  const { events, googleConnected, toggleGoogleConnection } = useApp();
  const [localEvents, setLocalEvents] = useState(events);
  const [selectedDay, setSelectedDay] = useState('Today (June 30)');
  const [optimizing, setOptimizing] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setLocalEvents(prev => prev.map(e => {
        if (e.conflict) {
          return { ...e, conflict: false, startTime: '16:45', endTime: '17:30', aiOptimized: true };
        }
        return e;
      }));
      setOptimizing(false);
    }, 800);
  };

  const filteredEvents = localEvents.filter(e => {
    if (filterType === 'all') return true;
    return e.type === filterType;
  });

  const conflictsCount = localEvents.filter(e => e.conflict).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 md:p-8 rounded-[24px] border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981]">
            <CalendarIcon className="w-4 h-4" /> Smart Calendar & Schedule Engine
          </div>
          <h1 className="text-2xl md:text-3xl font-['Sora'] font-bold text-gray-900 mt-1">
            Autonomous Schedule Optimization
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={toggleGoogleConnection}
            className={`flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${
              googleConnected 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${googleConnected ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
            {googleConnected ? 'Google Calendar Connected' : 'Connect GCal'}
          </button>

          {conflictsCount > 0 && (
            <button 
              onClick={handleOptimize}
              disabled={optimizing}
              className="bg-gradient-to-r from-[#10B981] to-[#064E3B] hover:opacity-90 text-white font-['Sora'] text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all transform active:scale-95"
            >
              <Sparkles className={`w-4 h-4 text-amber-300 ${optimizing ? 'animate-spin' : ''}`} />
              {optimizing ? 'AI Defragmenting...' : `1-Click Auto-Resolve (${conflictsCount} conflicts)`}
            </button>
          )}
        </div>
      </div>

      {/* Collision Alert Banner */}
      {conflictsCount > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between text-red-900">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">
              Warning: Detected {conflictsCount} schedule collision prior to Series B deadline submission. AI has calculated a 0-impact relocation path.
            </span>
          </div>
          <button onClick={handleOptimize} className="text-xs font-bold text-red-700 underline shrink-0 ml-4">Resolve Now</button>
        </div>
      )}

      {/* Main Calendar Grid & Timeline */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Control Column */}
        <div className="col-span-12 md:col-span-5 xl:col-span-4 space-y-5">
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-['Sora'] font-bold text-sm text-gray-900">June 2026</span>
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"><ChevronLeft className="w-4 h-4" /></button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-400 mb-2">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {[24, 25, 26, 27, 28, 29].map(d => (
                <span key={d} className="p-2 text-gray-300">{d}</span>
              ))}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(d => (
                <span 
                  key={d} 
                  onClick={() => setSelectedDay(`June ${d}`)}
                  className={`p-2 rounded-lg cursor-pointer font-semibold transition-all ${
                    d === 30 
                      ? 'bg-[#10B981] text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Filter block */}
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Filter Blocks</h4>
            <div className="space-y-2">
              <button 
                onClick={() => setFilterType('all')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${filterType === 'all' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'hover:bg-gray-50 text-gray-600'}`}
              >
                <span>All Event Types</span>
                <span>({localEvents.length})</span>
              </button>
              <button 
                onClick={() => setFilterType('deep_work')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${filterType === 'deep_work' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'hover:bg-gray-50 text-gray-600'}`}
              >
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Deep Work Shield</span>
              </button>
              <button 
                onClick={() => setFilterType('meeting')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${filterType === 'meeting' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'hover:bg-gray-50 text-gray-600'}`}
              >
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Stakeholder Syncs</span>
              </button>
              <button 
                onClick={() => setFilterType('recovery')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${filterType === 'recovery' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'hover:bg-gray-50 text-gray-600'}`}
              >
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Cognitive Decompress</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Day Timeline */}
        <div className="col-span-12 md:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-gray-200/80 p-5 md:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
            <div>
              <h3 className="text-lg font-['Sora'] font-bold text-gray-900">{selectedDay} Schedule</h3>
              <p className="text-xs text-gray-500 mt-0.5">Showing {filteredEvents.length} scheduled intervals</p>
            </div>
            <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              AI Defragmented
            </span>
          </div>

          <div className="space-y-4">
            {filteredEvents.map((ev) => (
              <div 
                key={ev.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  ev.conflict 
                    ? 'bg-red-50/80 border-red-200 shadow-md animate-pulse' 
                    : ev.type === 'deep_work'
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : ev.type === 'recovery'
                    ? 'bg-amber-50/50 border-amber-200'
                    : 'bg-gray-50 border-gray-200/80'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-center shrink-0 w-16 bg-white p-2 rounded-xl border border-gray-200/60 shadow-sm">
                    <p className="text-xs font-mono font-bold text-gray-900">{ev.startTime}</p>
                    <p className="text-[10px] font-mono text-gray-400">{ev.endTime}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-['Sora'] font-bold text-sm text-gray-900">{ev.title}</h4>
                      {ev.conflict && (
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Collision
                        </span>
                      )}
                      {ev.aiOptimized && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-600" /> Optimized
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {ev.attendees} participants</span>
                      <span className="capitalize px-2 py-0.5 rounded bg-white/80 border text-[10px] font-semibold">{ev.type.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {ev.conflict ? (
                    <button 
                      onClick={handleOptimize}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-colors"
                    >
                      Fix with AI
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-gray-400">Protected</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
