import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Brain,
  Monitor,
  Shield,
  Activity,
  TrendingDown
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden bg-white text-[#191C1D] font-['Inter'] relative">
      
      {/* Mesh Background Shader */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40 bg-[radial-gradient(circle_at_10%_20%,rgba(111,251,190,0.25)_0%,transparent_40%),radial-gradient(circle_at_90%_80%,rgba(166,242,207,0.25)_0%,transparent_40%)]" />

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981] to-[#064E3B] flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Zap className="w-4.5 h-4.5 fill-white" />
            </div>
            <span className="font-['Sora'] font-extrabold text-base tracking-tight text-gray-900">ZeroHour AI</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-wider text-gray-500">
            <a href="#features" className="hover:text-[#10B981] transition-colors">Product</a>
            <a href="#features" className="hover:text-[#10B981] transition-colors">Solutions</a>
            <a href="#digital-twin" className="hover:text-[#10B981] transition-colors font-extrabold text-[#10B981] border-b-2 border-[#10B981] pb-0.5">Intelligence</a>
            <a href="#features" className="hover:text-[#10B981] transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-xs font-bold text-gray-500 hover:text-[#10B981] transition-colors px-3 py-2"
            >
              Log In
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#10B981] hover:bg-[#064E3B] text-white font-['Sora'] text-xs font-bold px-4 py-2 rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-20">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#10B981] rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-[#10B981] animate-pulse"></span>
              Beta Available: Predictive Engine V2
            </div>
            <h1 className="font-['Sora'] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-none">
              Predict problems before they <span className="text-[#10B981] italic">happen.</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 max-w-xl leading-relaxed">
              ZeroHour AI predicts missed deadlines, reorganizes your schedule, and helps you take action before time runs out. Future-proof your productivity with an AI that's 3 steps ahead.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-[#10B981] hover:bg-[#064E3B] text-white font-['Sora'] text-xs font-bold px-6 py-3.5 rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                Start Free
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-['Sora'] text-xs font-bold px-6 py-3.5 rounded-xl transition-all"
              >
                Watch Demo
              </button>
            </div>
          </div>

          {/* Hero Mockup Card */}
          <div className="relative w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-[#10B981]/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-100 flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-300">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div className="text-[10px] font-mono text-gray-400 tracking-wider">DASHBOARD_LIVE.EXE</div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Risk</p>
                    <h3 className="text-3xl font-bold font-['Sora'] text-red-600">87%</h3>
                  </div>
                  <div className="h-16 w-32 bg-gray-50 rounded-xl relative overflow-hidden border border-gray-100">
                    <div className="absolute bottom-0 left-0 w-full h-[87%] bg-red-500/10"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[60%] bg-[#10B981]/15"></div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[#10B981] shrink-0">
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <div className="text-xs text-gray-600 font-medium leading-normal">
                    "Project Apollo will miss its 5PM deadline by 42 minutes. Should I shift your gym session?"
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-gray-100 text-left">
                    <p className="text-[9px] font-bold text-gray-400 uppercase">Recommended Action</p>
                    <p className="text-xs font-bold text-gray-800 mt-0.5">Activate Focus Mode</p>
                  </div>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-[#10B981] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/10 flex items-center justify-center transition-colors"
                  >
                    Auto-Reschedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-gray-50/50 py-12 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Deep Integrations & Infrastructure</p>
            <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2 text-gray-600 font-bold text-sm">
                <Monitor className="w-4 h-4 text-blue-500" />
                <span>Google Workspace</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 font-bold text-sm">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>Firebase Backend</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 font-bold text-sm">
                <Zap className="w-4 h-4 text-[#10B981]" />
                <span>Gemini Ultra 1.5</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <div className="mb-16 space-y-3">
            <h2 className="text-2xl sm:text-4xl font-['Sora'] font-bold text-gray-900 max-w-xl">Intuitive. Predictive. Intelligent.</h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg leading-relaxed">Five core engines working in parallel to ensure your day never falls apart.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Feature 1: Risk Engine */}
            <div className="lg:col-span-8 bg-gray-50 rounded-2xl p-8 border border-transparent hover:border-emerald-100 transition-all duration-300 flex flex-col justify-between min-h-[300px]">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center shadow-md shadow-emerald-500/10">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <h3 className="text-base font-['Sora'] font-bold text-gray-900">Deadline Risk Engine</h3>
                <p className="text-xs text-gray-500 max-w-md leading-relaxed">
                  Our neural network analyzes your typing speed, focus levels, and meeting density to predict a miss 4 hours before it happens.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => navigate('/risk')}
                  className="bg-white hover:bg-gray-100 text-xs font-bold text-[#10B981] border border-gray-200 px-4 py-2 rounded-xl transition-all"
                >
                  Explore Risk Engine
                </button>
              </div>
            </div>

            {/* Feature 2: Digital Twin */}
            <div className="lg:col-span-4 bg-gray-900 text-white rounded-2xl p-8 flex flex-col justify-between min-h-[300px] overflow-hidden relative group">
              <div className="absolute inset-0 bg-[#10B981]/10 blur-2xl group-hover:bg-[#10B981]/15 transition-all"></div>
              <div className="space-y-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-base font-['Sora'] font-bold text-white">Life Digital Twin</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  A persistent simulation of your schedule that runs 1,000 permutations every hour.
                </p>
              </div>
              <div className="mt-6 flex justify-end relative z-10">
                <button 
                  onClick={() => navigate('/twin')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                >
                  Sync Digital Twin
                </button>
              </div>
            </div>

            {/* Feature 3: SOS Mode */}
            <div className="lg:col-span-6 bg-red-50/50 rounded-2xl p-8 border border-red-100/50 flex flex-col justify-between min-h-[260px]">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center">
                  <Flame className="w-5 h-5 animate-pulse" />
                </div>
                <h3 className="text-base font-['Sora'] font-bold text-gray-900">SOS Recovery Shield</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Crisis management AI that instantly clears shallow tasks, mutes notifications, and protects calendar blocks when a hard deadline is in jeopardy.
                </p>
              </div>
              <button 
                onClick={() => navigate('/sos')}
                className="mt-6 w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-500/10 hover:scale-[1.01]"
              >
                Emergency Pivot
              </button>
            </div>

            {/* Feature 4: Focus Mode */}
            <div className="lg:col-span-6 bg-emerald-50/40 rounded-2xl p-8 border border-emerald-100/50 flex flex-col justify-between min-h-[260px]">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-base font-['Sora'] font-bold text-gray-900">Smart Focus Shield</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Silences all non-critical notifications based on current cognitive load and project priority. Autopilot focus preservation.
                </p>
              </div>
              <div className="mt-6 flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center font-bold text-[9px] text-gray-600">AR</div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center font-bold text-[9px] text-emerald-800">AI</div>
              </div>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
}
