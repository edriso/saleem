/** Pure date helpers. A "day key" is the local calendar day as "YYYY-MM-DD". */

export function todayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDays(date: Date, amount: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

/** Which greeting to show for the hour of day. */
export function greetingId(
  date: Date = new Date(),
): 'goodMorning' | 'goodAfternoon' | 'goodEvening' {
  const hour = date.getHours();
  if (hour < 12) return 'goodMorning';
  if (hour < 18) return 'goodAfternoon';
  return 'goodEvening';
}
