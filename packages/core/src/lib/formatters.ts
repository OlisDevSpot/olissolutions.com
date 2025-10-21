export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function capitalize(roofType: string) {
  return roofType.charAt(0).toUpperCase() + roofType.slice(1).replace(/([A-Z])/g, " $1");
}

export function numberToUSD(number: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}
