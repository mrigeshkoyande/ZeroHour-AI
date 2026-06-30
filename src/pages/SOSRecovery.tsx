import { 
  Flame, 
  BellOff, 
  Calendar, 
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SOSRecovery() {
  const { activeRecoveryMode, triggerSOSRecovery, exitSOSRecovery } = useApp();

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 text-white p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden text-center">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
          Autonomous Crisis & Overload Mitigation
        </div>

        <h1 className="font-['Sora'] font-extrabold text-3xl md:text-5xl tracking-tight max-w-3xl mx-auto">
          {activeRecoveryMode ? 'SOS Shield Protocol Active' : 'SOS Recovery Mode'}
        </h1>
        <p className="mt-4 text-sm md:text-lg text-amber-100 max-w-2xl mx-auto leading-relaxed">
          When burnout threatens high-stakes execution, ZeroHour AI instantly takes over your communications and schedule for 15 to 45 minutes.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          {!activeRecoveryMode ? (
            <button 
              onClick={triggerSOSRecovery}
              className="bg-white hover:bg-amber-50 text-orange-950 font-['Sora'] text-base font-bold px-8 py-4 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <Flame className="w-5 h-5 text-red-600 fill-red-600" />
              Activate SOS Shield (15 Minutes)
            </button>
          ) : (
            <button 
              onClick={exitSOSRecovery}
              className="bg-black/40 hover:bg-black/60 text-white border border-white/30 font-['Sora'] text-sm font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2"
            >
              Deactivate SOS Shield
            </button>
          )}
        </div>
      </div>

      {/* Autonomous Actions Taken */}
      <div className="bg-white rounded-[24px] border border-gray-200/80 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h3 className="font-['Sora'] font-bold text-lg text-gray-900">What ZeroHour AI Does Instantly</h3>
          <span className="text-xs font-bold text-[#10B981] bg-emerald-50 px-3 py-1 rounded-full">Automated Protocol</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
              <BellOff className="w-5 h-5" />
            </div>
            <h4 className="font-['Sora'] font-bold text-sm text-gray-900">Mutes Non-VIP Interruptions</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Silences Slack pings, automated emails, and calendar reminders. Only emergency investor calls pass through.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="font-['Sora'] font-bold text-sm text-gray-900">Auto-Shifts Flexible Meetings</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Politely notifies attendees that internal 1-on-1s are pushed by 30 mins to preserve cognitive bandwidth.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#10B981]">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-['Sora'] font-bold text-sm text-gray-900">Guided Decompression</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Presents a minimal, high-contrast focus screen designed to lower heart rate and restore mental clarity.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
