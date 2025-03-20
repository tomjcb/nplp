import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convertit une chaîne de temps au format "mm:ss" en secondes
 * @param timeString - Chaîne de temps au format "mm:ss" ou "hh:mm:ss"
 * @returns Nombre de secondes
 */
export function parseTimeString(timeString: string): number {
  const parts = timeString.split(':').map(part => parseInt(part, 10));
  
  if (parts.length === 3) {
    // Format hh:mm:ss
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    // Format mm:ss
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 1 && !isNaN(parts[0])) {
    // Format ss
    return parts[0];
  }
  
  return 0;
}

/**
 * Formate un nombre de secondes en chaîne de temps au format "mm:ss"
 * @param seconds - Nombre de secondes à formater
 * @returns Chaîne de temps au format "mm:ss"
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
