import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  type DeadlineItem, 
  type AISuggestion, 
  type CalendarEvent, 
  INITIAL_DEADLINES, 
  INITIAL_SUGGESTIONS, 
  INITIAL_EVENTS 
} from '../lib/mockData';

interface AppContextType {
  deadlines: DeadlineItem[];
  suggestions: AISuggestion[];
  events: CalendarEvent[];
  riskScore: number;
  focusMode: boolean;
  googleConnected: boolean;
  gmailConnected: boolean;
  aiThinking: boolean;
  activeRecoveryMode: boolean;
  toggleFocusMode: () => void;
  toggleGoogleConnection: () => void;
  toggleGmailConnection: () => void;
  acceptSuggestion: (id: string) => void;
  dismissSuggestion: (id: string) => void;
  resolveDeadline: (id: string) => void;
  triggerSOSRecovery: () => void;
  exitSOSRecovery: () => void;
  addNewDeadline: (item: Omit<DeadlineItem, 'id' | 'riskScore'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>(INITIAL_DEADLINES);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>(INITIAL_SUGGESTIONS);
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [riskScore, setRiskScore] = useState<number>(24);
  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [googleConnected, setGoogleConnected] = useState<boolean>(true);
  const [gmailConnected, setGmailConnected] = useState<boolean>(true);
  const [aiThinking, setAiThinking] = useState<boolean>(false);
  const [activeRecoveryMode, setActiveRecoveryMode] = useState<boolean>(false);

  // Recalculate risk score based on critical deadlines
  useEffect(() => {
    const activeCritical = deadlines.filter(d => !d.completed && d.riskLevel === 'critical').length;
    const activeMed = deadlines.filter(d => !d.completed && d.riskLevel === 'medium').length;
    const baseRisk = Math.min(95, Math.max(12, activeCritical * 32 + activeMed * 14 + (focusMode ? -15 : 0)));
    setRiskScore(baseRisk);
  }, [deadlines, focusMode]);

  const toggleFocusMode = () => {
    setFocusMode(prev => !prev);
  };

  const toggleGoogleConnection = () => {
    setGoogleConnected(prev => !prev);
  };

  const toggleGmailConnection = () => {
    setGmailConnected(prev => !prev);
  };

  const acceptSuggestion = (id: string) => {
    setAiThinking(true);
    setTimeout(() => {
      setSuggestions(prev => prev.filter(s => s.id !== id));
      if (id === 's1') {
        // Fix calendar conflict
        setEvents(prev => prev.map(e => e.conflict ? { ...e, conflict: false, aiOptimized: true } : e));
      }
      setAiThinking(false);
    }, 600);
  };

  const dismissSuggestion = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  const resolveDeadline = (id: string) => {
    setAiThinking(true);
    setTimeout(() => {
      setDeadlines(prev => prev.map(d => d.id === id ? { ...d, completed: true, riskLevel: 'stable' } : d));
      setAiThinking(false);
    }, 500);
  };

  const triggerSOSRecovery = () => {
    setActiveRecoveryMode(true);
    setFocusMode(true);
  };

  const exitSOSRecovery = () => {
    setActiveRecoveryMode(false);
  };

  const addNewDeadline = (item: Omit<DeadlineItem, 'id' | 'riskScore'>) => {
    const id = 'd_' + Date.now();
    const riskScore = item.riskLevel === 'critical' ? 88 : item.riskLevel === 'medium' ? 52 : 21;
    setDeadlines(prev => [{ ...item, id, riskScore, completed: false }, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        deadlines,
        suggestions,
        events,
        riskScore,
        focusMode,
        googleConnected,
        gmailConnected,
        aiThinking,
        activeRecoveryMode,
        toggleFocusMode,
        toggleGoogleConnection,
        toggleGmailConnection,
        acceptSuggestion,
        dismissSuggestion,
        resolveDeadline,
        triggerSOSRecovery,
        exitSOSRecovery,
        addNewDeadline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
