export function joinUrl(base: string | undefined, path: string) {
  const b = (base ?? '').toString().replace(/\/$/, '');
  const p = path.replace(/^\//, '');
  return b === '' ? `/${p}` : `${b}/${p}`;
}

export default joinUrl;
