import { SortValT } from '@/common/types/etc';
import { LibMemory } from './memory';

export class LibSort {
  public static sortBy<T>(arg: T[], key: keyof T, val: SortValT): T[] {
    return LibMemory.cpy(arg).sort((a: T, b: T) => {
      const valA: number = a[key] as number;
      const valB: number = b[key] as number;

      return (valA - valB) * (val === SortValT.ASC ? 1 : -1);
    });
  }

  public static sortByMany<T>(arr: T[], keys: { key: keyof T; order: SortValT }[]): T[] {
    return LibMemory.cpy(arr).sort((a: T, b: T) => {
      for (const { key, order } of keys) {
        if (!order) continue;

        const valA: number = a[key] as number;
        const valB: number = b[key] as number;
        if (valA === valB) continue;

        const multiplier: number = order === SortValT.ASC ? 1 : -1;

        return (valA - valB) * multiplier;
      }

      return 0;
    });
  }
}
