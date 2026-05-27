import type { ZakatResult } from '@/types'

export const NISAB_VALUE = 87.48 * 18500 // grams of gold × price per gram (PKR)
export const ZAKAT_RATE = 0.025

export const calculateZakat = (
  totalAssets: number,
  liabilities: number,
): ZakatResult => {
  const safeTotal = Number.isFinite(totalAssets) ? totalAssets : 0
  const safeLiabilities = Number.isFinite(liabilities) ? liabilities : 0

  const netAssets = safeTotal - safeLiabilities
  if (netAssets < NISAB_VALUE) return { liable: false, amount: 0 }
  return { liable: true, amount: netAssets * ZAKAT_RATE }
}

