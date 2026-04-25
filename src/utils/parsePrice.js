export function parsePriceNumber(value) {
  if (value == null || value === "") return NaN
  if (typeof value === "number")
    return Number.isFinite(value) ? value : NaN
  const cleaned = String(value).replace(/[^0-9.]/g, "")
  const n = parseFloat(cleaned)
  return Number.isFinite(n) ? n : NaN
}
