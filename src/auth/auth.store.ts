// store.ts
import { create } from 'zustand'

// Define types for state & actions
interface BearState {
  count: number
  inc: () => void
}

// Create store using the curried form of `create`
export const useCountStore = create<BearState>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count:state.count+1 })),
}))