import { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  actionCard?: {
    title: string;
    details: string;
    executed: boolean;
  };
}

export default function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "Hello Alex. I am connected to your Google Calendar, Gmail VIP inbox, and Linear workspace. I've analyzed your upcoming 48 hours. How can I assist your productivity today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;
    
    const userMsg: ChatMessage = { id: 'u_' + Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setThinking(true);

    setTimeout(() => {
      let aiText = "I have processed your request across your integrated tools.";
      let card = undefined;

      if (query.toLowerCase().includes('reschedule') || query.toLowerCase().includes('schedule')) {
        aiText = "I identified a 45-minute collision at 2:00 PM. I moved the internal sync to 4:30 PM.";
        card = { title: "Calendar Optimized", details: "Moved 'Product Architecture Sync' to 16:30. 90 mins deep work unlocked.", executed: true };
      } else if (query.toLowerCase().includes('cfo') || query.toLowerCase().includes('audit') || query.toLowerCase().includes('financial')) {
        aiText = "I extracted key points from the CFO's unread Gmail attachment and prepared a bulleted executive briefing.";
        card = { title: "CFO Attachment Summarized", details: "3 action items highlighted: Burn rate runway, Q3 headcount freeze, and Series B deck slides 12-14.", executed: true };
      } else {
        aiText = `Analyzed "${query}". Based on your current focus score of 94%, allocating this task to tomorrow morning ensures 100% SLA completion without overtime.`;
      }

      setMessages(prev => [...prev, { id: 'a_' + Date.now(), sender: 'ai', text: aiText, actionCard: card }]);
      setThinking(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981] to-[#064E3B] flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-['Sora'] font-bold text-sm text-gray-900">Gemini 3.1 Pro Autonomous Assistant</h2>
            <p className="text-[11px] text-emerald-600 font-medium">Full Context Access • GCal & Gmail Connected</p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
          Latency: 412ms
        </span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-emerald-700" />
              </div>
            )}
            
            <div className={`max-w-xl space-y-3 ${m.sender === 'user' ? 'bg-[#10B981] text-white rounded-2xl rounded-tr-sm p-4 text-xs font-medium' : 'bg-gray-50 text-gray-800 rounded-2xl rounded-tl-sm p-4 text-xs border border-gray-100'}`}>
              <p className="leading-relaxed">{m.text}</p>
              
              {m.actionCard && (
                <div className="p-3 rounded-xl bg-white border border-emerald-200/80 shadow-sm text-gray-900 space-y-1 mt-2">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" /> {m.actionCard.title}
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">{m.actionCard.details}</p>
                </div>
              )}
            </div>

            {m.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center shrink-0 font-['Sora'] text-xs font-bold">
                AR
              </div>
            )}
          </div>
        ))}

        {thinking && (
          <div className="flex gap-3 items-center text-xs text-gray-400">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 animate-pulse">
              <Sparkles className="w-4 h-4 text-emerald-700 animate-spin-slow" />
            </div>
            <span>Gemini is synthesizing context across calendar & inbox...</span>
          </div>
        )}
      </div>

      {/* Prompt Chips */}
      <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex flex-wrap gap-2">
        <button 
          onClick={() => handleSend("Reschedule overlapping afternoon meetings")}
          className="text-[11px] font-semibold bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 border border-gray-200 px-3 py-1.5 rounded-full transition-colors"
        >
          ⚡ Reschedule collisions
        </button>
        <button 
          onClick={() => handleSend("Summarize unread CFO attachment in Gmail")}
          className="text-[11px] font-semibold bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 border border-gray-200 px-3 py-1.5 rounded-full transition-colors"
        >
          📄 Summarize CFO attachment
        </button>
        <button 
          onClick={() => handleSend("Simulate burnout impact if I add 2 more meetings")}
          className="text-[11px] font-semibold bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 border border-gray-200 px-3 py-1.5 rounded-full transition-colors"
        >
          🧠 Simulate burnout impact
        </button>
      </div>

      {/* Input Box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 border-t border-gray-100 bg-white flex items-center gap-3">
        <input 
          type="text"
          placeholder="Ask Gemini to orchestrate your schedule or reply to emails..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:bg-white transition-all"
        />
        <button 
          type="submit"
          className="bg-[#10B981] hover:bg-[#064E3B] text-white p-3 rounded-xl shadow-md transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
