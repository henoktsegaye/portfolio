import { format, isValid } from "date-fns";

export function formatPostDate(date: string): string {
  const parsed = new Date(date);
  return isValid(parsed) ? format(parsed, "MMM d, yyyy") : "Unknown date";
}
