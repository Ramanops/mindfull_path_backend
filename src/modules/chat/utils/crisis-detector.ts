const crisisKeywords = [
  'suicide',
  'kill myself',
  'end my life',
  'self harm',
  'hurt myself',
];

export function detectCrisis(message: string): boolean {
  const lower = message.toLowerCase();
  return crisisKeywords.some(keyword => lower.includes(keyword));
}