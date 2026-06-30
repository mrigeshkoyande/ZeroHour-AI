import { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  BrainCircuit, 
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AIPlanner() {
  const { deadlines, addNewDeadline, resolveDeadline } = useApp();
  const [newTitle, setNewTitle] = useState('');
  const [newProject, setNewProject] = useState('Platform Eng');
  const [newRisk, setNewRisk] = useState<'critical' | 'medium' | 'low'>('medium');
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<string | null>(null);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addNewDeadline({
      title: newTitle.trim(),
      project: newProject,
      dueDate: 'Tomorrow',
      dueTime: '5:00 PM',
      riskLevel: newRisk,
      reason: 'User created milestone in AI Planner.',
      aiSolution: 'Reserved 90m block in morning slot for focused completion.',
      source: 'Linear'
    });
    setNewTitle('');
  };

  const handleSimulateFuture = () => {
    setSimulating(true);
    setSimResult(null);
    setTimeout(() => {
      setSimulating(false);
      setSimResult('Simulating +2 Sprint Deliverables: Burnout risk increases to 74% on Thursday. Recommendation: Delegate PR review #402 to Elena Rostova to retain 92% SLA.');
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 md:p-8 rounded-[24px] border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981]">
            <BrainCircuit className="w-4 h-4" /> Autonomous Task & Resource Planner
          </div>
          <h1 className="text-2xl md:text-3xl font-['Sora'] font-bold text-gray-900 mt-1">
            Predictive AI Planner
          </h1>
        </div>
        <button 
          onClick={handleSimulateFuture}
          disabled={simulating}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 text-white font-['Sora'] text-xs font-bold px-5 py-3 rounded-xl shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all"
        >
          <Sliders className={`w-4 h-4 ${simulating ? 'animate-spin' : ''}`} />
          {simulating ? 'Running Gemini Simulation...' : 'Run Future Simulation'}
        </button>
      </div>

      {/* Simulation Result Box */}
      {simResult && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-950 flex items-start gap-3 shadow-md animate-in fade-in duration-300">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-['Sora'] font-bold text-sm">Future Horizon Simulation Output</h4>
            <p className="text-xs mt-1 leading-relaxed">{simResult}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        
        {/* Left: Quick Create Task Form */}
        <div className="col-span-12 md:col-span-5 xl:col-span-4 bg-white rounded-2xl border border-gray-200/80 p-5 md:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.03)] h-fit">
          <h3 className="font-['Sora'] font-bold text-base text-gray-900 mb-4">Inject High-Velocity Milestone</h3>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Deliverable Title</label>
              <input 
                type="text" 
                placeholder="e.g. SOC2 Evidence Submission"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Project Scope</label>
              <select 
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500"
              >
                <option value="Platform Eng">Platform Eng</option>
                <option value="ZeroHour Core">ZeroHour Core</option>
                <option value="Legal & Ops">Legal & Ops</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Calculated Priority Level</label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'critical'] as const).map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setNewRisk(level)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize border transition-all ${
                      newRisk === level
                        ? level === 'critical' ? 'bg-red-500 text-white border-red-500' : level === 'medium' ? 'bg-amber-500 text-white border-amber-500' : 'bg-[#10B981] text-white border-[#10B981]'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#10B981] hover:bg-[#064E3B] text-white font-['Sora'] text-xs font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add & Calculate AI Buffer
            </button>
          </form>
        </div>

        {/* Right: Active Planned Deliverables */}
        <div className="col-span-12 md:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-gray-200/80 p-5 md:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
            <div>
              <h3 className="font-['Sora'] font-bold text-lg text-gray-900">Active Deliverables & AI Solutions</h3>
              <p className="text-xs text-gray-500 mt-0.5">Real-time risk scoring and mitigation strategies</p>
            </div>
            <span className="text-xs font-bold text-gray-400">{deadlines.length} items</span>
          </div>

          <div className="space-y-4">
            {deadlines.map((item) => (
              <div 
                key={item.id}
                className={`p-5 rounded-2xl border transition-all ${
                  item.completed ? 'bg-gray-50/50 border-gray-100 opacity-60' : 'bg-white border-gray-200/80 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.riskLevel === 'critical' ? 'bg-red-500' : item.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-[#10B981]'}`} />
                    <div>
                      <h4 className={`font-['Sora'] font-bold text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">{item.project} • Due {item.dueDate} at {item.dueTime} ({item.source})</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                      item.riskLevel === 'critical' ? 'bg-red-100 text-red-800' : item.riskLevel === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      Risk Score: {item.riskScore}%
                    </span>
                    {!item.completed && (
                      <button 
                        onClick={() => resolveDeadline(item.id)}
                        className="bg-emerald-50 hover:bg-[#10B981] text-emerald-800 hover:text-white text-xs font-bold px-3.5 py-1.5 rounded-xl border border-emerald-200 transition-colors"
                      >
                        Complete ✓
                      </button>
                    )}
                  </div>
                </div>

                {!item.completed && (
                  <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <span className="font-bold text-gray-600 uppercase tracking-wider text-[10px] block mb-1">Detected Risk Factor</span>
                      <p className="text-gray-700 leading-relaxed">{item.reason}</p>
                    </div>
                    <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 text-emerald-900">
                      <span className="font-bold text-emerald-700 uppercase tracking-wider text-[10px] block mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" /> Gemini Autonomous Solution
                      </span>
                      <p className="leading-relaxed font-medium">{item.aiSolution}</p>
                    </div>
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
