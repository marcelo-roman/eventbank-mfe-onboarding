import { describe, expect, it } from 'vitest';
import { maskCpf, maskPhone } from './masks';

describe('masks', () => {
  it('formats a CPF as it is typed', () => {
    expect(maskCpf('529')).toBe('529');
    expect(maskCpf('5299822')).toBe('529.982.2');
    expect(maskCpf('52998224725')).toBe('529.982.247-25');
    expect(maskCpf('529.982.247-2599')).toBe('529.982.247-25');
  });

  it('formats mobile and landline numbers', () => {
    expect(maskPhone('11987654321')).toBe('(11) 98765-4321');
    expect(maskPhone('1133334444')).toBe('(11) 3333-4444');
    expect(maskPhone('11')).toBe('11');
  });
});
