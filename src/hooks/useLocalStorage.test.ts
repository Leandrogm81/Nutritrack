import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  it('persists updated values in localStorage', () => {
    const key = 'useLocalStorage-smoke-key';
    window.localStorage.removeItem(key);

    const { result } = renderHook(() => useLocalStorage<number>(key, 100));
    expect(result.current[0]).toBe(100);

    act(() => {
      result.current[1](250);
    });

    expect(result.current[0]).toBe(250);
    expect(window.localStorage.getItem(key)).toBe('250');
  });
});
