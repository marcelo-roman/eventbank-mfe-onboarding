export function digits(value: string): string {
  return value.replaceAll(/\D/g, '');
}

export function maskCpf(value: string): string {
  const d = digits(value).slice(0, 11);
  return (
    [d.slice(0, 3), d.slice(3, 6), d.slice(6, 9)].filter(Boolean).join('.') + (d.length > 9 ? `-${d.slice(9)}` : '')
  );
}

export function maskPhone(value: string): string {
  const d = digits(value).slice(0, 11);
  if (d.length <= 2) {
    return d;
  }
  const local = d.slice(2);
  const split = local.length > 8 ? 5 : 4;
  return `(${d.slice(0, 2)}) ${local.slice(0, split)}${local.length > split ? `-${local.slice(split)}` : ''}`;
}
