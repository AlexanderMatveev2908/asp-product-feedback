export type AppBtnVarT = 'red' | 'purple' | 'blue' | 'blue_dark';

export interface AppBtnClrVarT {
  hexDef: string;
  hexHover: string;
}

export class AppBtnUiFkt {
  private static readonly variables: Record<AppBtnVarT, AppBtnClrVarT> = {
    blue: {
      hexDef: 'var(--blue__prm)',
      hexHover: '#7C91F9',
    },
    blue_dark: {
      hexDef: 'var(--blue__dark__1)',
      hexHover: '#656EA3',
    },
    purple: {
      hexDef: 'var(--purple__prm)',
      hexHover: '#C75AF6',
    },
    red: {
      hexDef: 'var(--red__prm)',
      hexHover: '#E98888',
    },
  };

  public static varByT(t: AppBtnVarT): AppBtnClrVarT {
    return this.variables[t];
  }
}
