import { create } from 'zustand'

interface Solution {
  id: string
  name: string
  description: string
  whatItDoes: string
  howItHelps: string
  easeOfUse: string
  price: number
  category: string
  featured?: boolean
}

interface Purchase {
  id: string
  solutionId: string
  userId: string
  status: 'active' | 'trial' | 'cancelled'
  purchaseDate: string
  nextBilling?: string
  trialEnds?: string
}

interface AppState {
  // Solutions
  solutions: Solution[]
  setSolutions: (solutions: Solution[]) => void

  // Purchases
  purchases: Purchase[]
  setPurchases: (purchases: Purchase[]) => void
  addPurchase: (purchase: Purchase) => void

  // UI State
  isLoading: boolean
  setIsLoading: (loading: boolean) => void

  // Filters
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export const useAppStore = create<AppState>(set => ({
  // Solutions
  solutions: [],
  setSolutions: solutions => set({ solutions }),

  // Purchases
  purchases: [],
  setPurchases: purchases => set({ purchases }),
  addPurchase: purchase => set(state => ({
    purchases: [...state.purchases, purchase],
  })),

  // UI State
  isLoading: false,
  setIsLoading: isLoading => set({ isLoading }),

  // Filters
  selectedCategory: 'All',
  setSelectedCategory: selectedCategory => set({ selectedCategory }),
}))
