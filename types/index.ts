export interface Wish {
  id: string
  name: string
  message: string
  language: 'English' | 'Urdu' | 'Arabic'
  hearts: number
  created_at: string
}

export interface CardConfig {
  template: 'geometric' | 'crescent' | 'kabah' | 'minimal'
  palette: 'forest' | 'night' | 'dawn' | 'desert'
  to: string
  message: string
  from: string
}

export interface ZakatResult {
  liable: boolean
  amount: number
}

export interface Charity {
  name: string
  cause: string
  url: string
  initials: string
  color: string
}

