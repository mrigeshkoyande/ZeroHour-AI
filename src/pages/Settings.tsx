import { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Calendar, 
  Mail, 
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { googleConnected, gmailConnected, toggleGoogleConnection, toggleGmailConnection } = useApp();
  const [autonomyLevel, setAutonomyLevel] = useState<'conservative' | 'balanced' | 'founder'>('balanced');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 md:p-8 rounded-[24px] border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981]">
            <SettingsIcon className="w-4 h-4" /> System Preferences & Autonomy
          </div>
          <h1 className="text-2xl md:text-3xl font-['Sora'] font-bold text-gray-900 mt-1">
            OS Configuration
          </h1>
        </div>
        <button 
          onClick={handleSave}
          className="bg-[#10B981] hover:bg-[#064E3B] text-white font-['Sora'] text-xs font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
        >
          {saved ? <CheckCircle2 className="w-4 h-4" /> : null}
          {saved ? 'Preferences Saved ✓' : 'Save Changes'}
        </button>
      </div>

      {/* Integrations Section */}
      <div className="bg-white rounded-[24px] border border-gray-200/80 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-6">
        <h3 className="font-['Sora'] font-bold text-lg text-gray-900 border-b border-gray-100 pb-3">Live Tool Integrations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Google Calendar Sync</h4>
                <p className="text-xs text-gray-500">Continuous 24/7 block defragmentation</p>
              </div>
            </div>
            <button 
              onClick={toggleGoogleConnection}
              className={`text-xs font-bold px-4 py-1.5 rounded-full border transition-all ${
                googleConnected ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              {googleConnected ? 'Active ✓' : 'Connect'}
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Gmail VIP Intelligence</h4>
                <p className="text-xs text-gray-500">Extract action items & draft replies</p>
              </div>
            </div>
            <button 
              onClick={toggleGmailConnection}
              className={`text-xs font-bold px-4 py-1.5 rounded-full border transition-all ${
                gmailConnected ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              {gmailConnected ? 'Active ✓' : 'Connect'}
            </button>
          </div>
        </div>
      </div>

      {/* AI Autonomy Mode Section */}
      <div className="bg-white rounded-[24px] border border-gray-200/80 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-6">
        <h3 className="font-['Sora'] font-bold text-lg text-gray-900 border-b border-gray-100 pb-3">Gemini 3.1 Pro Autonomy Policy</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            onClick={() => setAutonomyLevel('conservative')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              autonomyLevel === 'conservative' ? 'bg-emerald-50/70 border-[#10B981] shadow-md' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <h4 className="font-['Sora'] font-bold text-sm text-gray-900">Conservative Suggestion</h4>
            <p className="text-xs text-gray-600 mt-2">AI suggests schedule optimizations but requires explicit manual click before modifying calendar.</p>
          </div>

          <div 
            onClick={() => setAutonomyLevel('balanced')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              autonomyLevel === 'balanced' ? 'bg-emerald-50/70 border-[#10B981] shadow-md' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded uppercase block w-fit mb-2">Recommended</span>
            <h4 className="font-['Sora'] font-bold text-sm text-gray-900">Balanced Autonomous</h4>
            <p className="text-xs text-gray-600 mt-2">Auto-reschedules non-VIP internal syncs when collision risk crosses 70%.</p>
          </div>

          <div 
            onClick={() => setAutonomyLevel('founder')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              autonomyLevel === 'founder' ? 'bg-amber-50/70 border-[#FB923C] shadow-md' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <h4 className="font-['Sora'] font-bold text-sm text-gray-900">Aggressive Founder Mode</h4>
            <p className="text-xs text-gray-600 mt-2">Maximum protection. AI automatically declines low-priority invites and enforces 4h daily focus shield.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
