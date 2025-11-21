export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function capitalize(roofType: string) {
  return roofType.charAt(0).toUpperCase() + roofType.slice(1).replace(/([A-Z])/g, ' $1')
}

export function numberToUSD(number: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number)
}

export function formatAsDollars(value: number) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

export function formatAsPercent(value: number) {
  return `${value.toFixed(0)}%`
}

export function convertToNumber(value: string, startFormat: 'currency' | 'percent' = 'currency') {
  switch (startFormat) {
    case 'currency':
      return Number(value.replace(/\D/g, ''))
    case 'percent':
      return Number(value.replace(/%/g, ''))
  }
}
