import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7']
    },
  }
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
