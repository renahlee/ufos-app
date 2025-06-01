export function niceDt(dt: number): string {
  if (dt < 1000) {
    return `${Math.round(dt)}ms`;
  }
  dt /= 1000; // -> seconds
  if (dt < 60) {
    return `${dt.toFixed(1)}s`;
  }
  dt /= 60; // minutes
  const s = Math.round((dt % 1) * 60);
  let m = Math.floor(dt);
  if (dt < 60) {
    return `${m}m${s}s`;
  }
  dt /= 60; // hours
  m %= 60;
  return `${Math.floor(dt).toLocaleString()}h${m}m${s}s`;
}
