import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Mail, 
  CheckCircle2, 
  Flame, 
  Layers,
  Play
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState<'predict' | 'recover' | 'optimize'>('predict');

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden bg-white text-[#191C1D] font-['Inter']">
      
      {/* Top Navigation */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#064E3B] flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <span className="font-['Sora'] font-extrabold text-xl tracking-tight text-[#111827]">ZeroHour AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-[#10B981] transition-colors">Risk Engine</a>
          <a href="#digital-twin" className="hover:text-[#10B981] transition-colors">Life Digital Twin</a>
          <a href="#integrations" className="hover:text-[#10B981] transition-colors">Integrations</a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-sm font-semibold text-gray-700 hover:text-[#10B981] transition-colors px-3 py-2"
          >
            Live Demo
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-[#10B981] hover:bg-[#064E3B] text-white font-['Sora'] text-sm font-bold px-6 py-3 rounded-full shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
          >
            Launch Command Center
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 max-w-7xl mx-auto px-6 text-center">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-400/15 via-emerald-300/10 to-orange-400/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-800 uppercase tracking-widest mb-8 animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Powered by Google Gemini 3.1 Pro Autonomous Engine
        </div>

        <h1 className="font-['Sora'] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#111827] leading-[1.08] max-w-5xl mx-auto">
          When Every <span className="bg-gradient-to-r from-[#10B981] via-[#006C49] to-[#FB923C] bg-clip-text text-transparent">Minute</span> Matters.
        </h1>

        <p className="mt-8 text-lg md:text-2xl text-[#6B7280] font-normal max-w-3xl mx-auto leading-relaxed">
          The autonomous AI productivity operating system that predicts missed deadlines 48 hours before they happen and executes instant schedule recovery.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto bg-[#10B981] hover:bg-[#064E3B] text-white font-['Sora'] text-base font-bold px-8 py-4 rounded-full shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-3 transition-all transform hover:scale-105"
          >
            Enter AI Command Center
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate('/risk')}
            className="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 text-[#111827] font-['Sora'] text-base font-semibold px-8 py-4 rounded-full border border-gray-200 flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            Simulate Deadline Risk
          </button>
        </div>

        {/* Live Interactive OS Preview Box */}
        <div className="mt-20 rounded-3xl bg-white border border-gray-200 shadow-[0_35px_80px_rgba(0,0,0,0.07)] p-4 md:p-8 text-left max-w-6xl mx-auto relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs font-mono text-gray-400 font-semibold">zerohour://autonomous-os/live-stream</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveFeature('predict')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${activeFeature === 'predict' ? 'bg-[#10B981] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                1. Predict Collisions
              </button>
              <button 
                onClick={() => setActiveFeature('recover')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${activeFeature === 'recover' ? 'bg-[#FB923C] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                2. Auto-Recovery
              </button>
              <button 
                onClick={() => setActiveFeature('optimize')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${activeFeature === 'optimize' ? 'bg-[#064E3B] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                3. Focus Velocity
              </button>
            </div>
          </div>

          {activeFeature === 'predict' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
              <div className="bg-red-50/70 border border-red-200 p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Critical Alert</span>
                  <span className="text-xs text-red-800 font-bold font-mono">In 2 hours</span>
                </div>
                <h4 className="font-['Sora'] font-bold text-lg text-gray-900">Series B Financial Model Audit</h4>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Detected 3 overlapping investor meetings prior to submission + unread attachment from CFO in Gmail.
                </p>
                <div className="mt-4 pt-4 border-t border-red-200/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-red-700">Risk Level: 89%</span>
                  <button onClick={() => navigate('/risk')} className="text-xs font-bold text-emerald-700 hover:underline">View Engine →</button>
                </div>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 p-6 rounded-2xl md:col-span-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Gemini Autonomous Solution Ready
                  </div>
                  <h4 className="font-['Sora'] font-bold text-xl text-gray-900">Auto-Reschedule Internal Sync & Summarize CFO Attachment</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    ZeroHour AI analyzed participants' Google Calendars and found an unassigned 45-minute block at 4:30 PM. Moving internal sync frees up continuous focus time for submission.
                  </p>
                </div>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => navigate('/dashboard')} className="bg-[#10B981] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md hover:bg-emerald-600 transition-colors">
                    Execute AI Fix (1-Click)
                  </button>
                  <span className="text-xs text-gray-400 self-center">Guarantees 100% on-time delivery</span>
                </div>
              </div>
            </div>
          )}

          {activeFeature === 'recover' && (
            <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 p-8 rounded-2xl border border-amber-200 animate-in fade-in duration-300 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="bg-[#FB923C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">SOS Recovery Mode</span>
                <h3 className="font-['Sora'] font-bold text-2xl text-gray-900 mt-3">Overwhelmed? Let AI take the wheel for 15 minutes.</h3>
                <p className="text-sm text-gray-600 mt-2 max-w-xl">
                  When cognitive overload crosses 85%, ZeroHour automatically mutes non-VIP pings, shifts flexible meetings, and initiates deep decompression protocols.
                </p>
              </div>
              <button onClick={() => navigate('/sos')} className="shrink-0 bg-[#FB923C] hover:bg-orange-600 text-white font-['Sora'] font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg flex items-center gap-2">
                <Flame className="w-4 h-4 fill-white" />
                Preview SOS Shield
              </button>
            </div>
          )}

          {activeFeature === 'optimize' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-in fade-in duration-300 text-center">
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-2xl font-['Sora'] font-extrabold text-[#10B981]">94.8%</p>
                <p className="text-xs text-gray-500 mt-1 font-semibold">Schedule Efficiency</p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-2xl font-['Sora'] font-extrabold text-[#111827]">3.5 hrs</p>
                <p className="text-xs text-gray-500 mt-1 font-semibold">Deep Work Unlocked Daily</p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-2xl font-['Sora'] font-extrabold text-[#FB923C]">0</p>
                <p className="text-xs text-gray-500 mt-1 font-semibold">Missed Deadlines</p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-2xl font-['Sora'] font-extrabold text-blue-600">412 ms</p>
                <p className="text-xs text-gray-500 mt-1 font-semibold">Predictive Latency</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trust & Integrations Banner */}
      <section id="integrations" className="py-16 bg-[#F8F9FA] border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Built to integrate seamlessly with the world's leading high-velocity tools
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70">
            <div className="flex items-center gap-2 font-['Sora'] font-bold text-lg text-gray-800">
              <Calendar className="w-5 h-5 text-blue-600" /> Google Calendar
            </div>
            <div className="flex items-center gap-2 font-['Sora'] font-bold text-lg text-gray-800">
              <Mail className="w-5 h-5 text-red-500" /> Gmail VIP
            </div>
            <div className="flex items-center gap-2 font-['Sora'] font-bold text-lg text-gray-800">
              <Layers className="w-5 h-5 text-purple-600" /> Linear
            </div>
            <div className="flex items-center gap-2 font-['Sora'] font-bold text-lg text-gray-800">
              <Sparkles className="w-5 h-5 text-emerald-600" /> Google Gemini Pro
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dives */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6 space-y-24">
        {/* Feature 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">Predictive Architecture</span>
            <h2 className="font-['Sora'] font-extrabold text-3xl md:text-5xl text-gray-900 mt-4 leading-tight">
              Predict bottlenecks before your team even notices.
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed text-base">
              Traditional todo lists wait for you to miss a task. ZeroHour AI monitors your email load, meeting cadences, and task complexity to calculate real-time completion probability.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Continuous 24/7 calendar scan
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Automatic meeting restructuring proposals
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-xl">
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-sm flex justify-between items-center">
                <span className="font-bold text-sm text-gray-900">Series B Audit Delivery</span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">89% Collision Probability</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-sm flex justify-between items-center">
                <span className="font-bold text-sm text-gray-900">Linear v3 API Migration</span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">54% Review Delay</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-20 bg-[#111827] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-['Sora'] font-extrabold text-3xl md:text-5xl">
            Take command of your time.
          </h2>
          <p className="text-gray-400 mt-4 text-base">
            Join thousands of founders, executives, and engineers running on autonomous AI scheduling.
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-8 bg-[#10B981] hover:bg-emerald-600 text-white font-['Sora'] font-bold px-8 py-4 rounded-full shadow-2xl transition-all"
          >
            Launch Command Center Now
          </button>
        </div>
      </footer>

    </div>
  );
}
