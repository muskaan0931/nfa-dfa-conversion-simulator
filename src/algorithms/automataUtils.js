export function canonicalSubset(states) {
  return [...new Set(states)].sort();
}

export function subsetKey(states) {
  return canonicalSubset(states).join(",");
}

export function displaySubset(states) {
  const sorted = canonicalSubset(states);
  return sorted.length ? `{${sorted.join(", ")}}` : "∅";
}

export function splitSymbols(value) {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function unique(values) {
  return [...new Set(values)];
}
