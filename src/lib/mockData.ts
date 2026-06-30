export interface DeadlineItem {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  dueTime: string;
  riskLevel: 'critical' | 'medium' | 'low' | 'stable';
  riskScore: number;
  reason: string;
  aiSolution: string;
  source: 'Gmail' | 'Google Calendar' | 'Linear' | 'GitHub' | 'Slack';
  completed?: boolean;
}

export interface AISuggestion {
  id: string;
  type: 'reschedule' | 'recovery' | 'focus' | 'delegation';
  title: string;
  description: string;
  impact: string;
  actionText: string;
  timeSaved: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  type: 'meeting' | 'deep_work' | 'recovery' | 'deadline';
  attendees: number;
  aiOptimized?: boolean;
  conflict?: boolean;
}

export interface DigitalTwinMetric {
  category: string;
  currentValue: number;
  targetValue: number;
  trend: 'up' | 'down' | 'stable';
  status: 'Optimal' | 'Warning' | 'Overload';
}

export const INITIAL_DEADLINES: DeadlineItem[] = [
  {
    id: 'd1',
    title: 'Series B Financial Model Audit',
    project: 'ZeroHour Core',
    dueDate: 'Today',
    dueTime: '2:00 PM',
    riskLevel: 'critical',
    riskScore: 89,
    reason: 'Detected 3 overlapping investor meetings prior to submission deadline + unread Gmail attachment from CFO.',
    aiSolution: 'Auto-reschedule 1:00 PM internal sync & draft summary of CFO attachment using Gemini Ultra.',
    source: 'Gmail'
  },
  {
    id: 'd2',
    title: 'Linear v3.2 API Migration Spec',
    project: 'Platform Eng',
    dueDate: 'Tomorrow',
    dueTime: '10:00 AM',
    riskLevel: 'medium',
    riskScore: 54,
    reason: 'GitHub PR #402 is pending review from 2 engineers currently out of office.',
    aiSolution: 'Escalate review request via Slack bot to backup maintainer (Elena Rostova).',
    source: 'GitHub'
  },
  {
    id: 'd3',
    title: 'Enterprise SOC2 Compliance Audit Briefing',
    project: 'Legal & Ops',
    dueDate: 'Jul 2',
    dueTime: '4:30 PM',
    riskLevel: 'stable',
    riskScore: 18,
    reason: 'All prerequisite checks verified via Vanta integration.',
    aiSolution: 'Automated calendar block added for 30-min prep room before call.',
    source: 'Google Calendar'
  },
  {
    id: 'd4',
    title: 'Q3 Product Keynote Rehearsal',
    project: 'Executive',
    dueDate: 'Jul 3',
    dueTime: '11:00 AM',
    riskLevel: 'low',
    riskScore: 28,
    reason: 'Slide deck finalized in Notion AI. Speaker notes generated.',
    aiSolution: 'Enable Focus Shield 2 hours prior to lock notifications.',
    source: 'Linear'
  }
];

export const INITIAL_SUGGESTIONS: AISuggestion[] = [
  {
    id: 's1',
    type: 'reschedule',
    title: 'Resolve 2:00 PM Calendar Collision',
    description: 'You have a deep-work block overlapping with the Product Sync. Moving the Sync to 4:30 PM frees 90 continuous minutes.',
    impact: '+22% Focus Velocity',
    actionText: 'Auto-Reschedule in GCal',
    timeSaved: '90m saved'
  },
  {
    id: 's2',
    type: 'recovery',
    title: 'Pre-emptive Burnout Protection',
    description: 'Your cognitive load metric reached 84% over the last 4 hours. AI recommends inserting a 15-min decompression block.',
    impact: 'Reduces fatigue risk by 65%',
    actionText: 'Activate SOS Decompress',
    timeSaved: 'Energy restored'
  },
  {
    id: 's3',
    type: 'delegation',
    title: 'Draft Gmail Replies for 14 Low-Priority Threads',
    description: 'Gemini 3.1 Pro has prepared draft responses for your routine vendor inquiries waiting in your inbox.',
    impact: 'Inbox Zero in 1 click',
    actionText: 'Review & Send Drafts',
    timeSaved: '45m saved'
  }
];

export const INITIAL_EVENTS: CalendarEvent[] = [
  { id: 'e1', title: 'Deep Work: Core Engine Refactor', startTime: '09:00', endTime: '11:00', type: 'deep_work', attendees: 1, aiOptimized: true },
  { id: 'e2', title: 'Product Architecture Sync', startTime: '11:15', endTime: '12:00', type: 'meeting', attendees: 6, conflict: true },
  { id: 'e3', title: 'AI Recovery & Lunch Decompression', startTime: '12:30', endTime: '13:30', type: 'recovery', attendees: 1, aiOptimized: true },
  { id: 'e4', title: 'Series B Financial Model Submission', startTime: '14:00', endTime: '14:30', type: 'deadline', attendees: 4, conflict: true },
  { id: 'e5', title: 'Exec Standup & Growth Metrics', startTime: '15:30', endTime: '16:30', type: 'meeting', attendees: 8, aiOptimized: true },
];

export const PRODUCTIVITY_ANALYTICS = [
  { day: 'Mon', focusScore: 84, meetings: 3.5, recovery: 92, riskIgnored: 1 },
  { day: 'Tue', focusScore: 91, meetings: 2.0, recovery: 88, riskIgnored: 0 },
  { day: 'Wed', focusScore: 78, meetings: 4.5, recovery: 74, riskIgnored: 2 },
  { day: 'Thu', focusScore: 88, meetings: 3.0, recovery: 85, riskIgnored: 0 },
  { day: 'Today', focusScore: 94, meetings: 2.5, recovery: 96, riskIgnored: 0 },
  { day: 'Sat', focusScore: 98, meetings: 0.5, recovery: 99, riskIgnored: 0 },
  { day: 'Sun', focusScore: 95, meetings: 0.0, recovery: 100, riskIgnored: 0 }
];
