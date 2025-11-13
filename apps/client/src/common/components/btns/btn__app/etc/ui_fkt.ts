export type AppBtnVarT = 'red' | 'purple' | 'blue' | 'blue_dark';

export interface AppBtnClrVarT {
  hexDef: string;
  hexHover: string;
}

export class AppBtnUiFkt {
  private static readonly variables: Record<AppBtnVarT, AppBtnClrVarT> = {
    blue: {
      hexDef: '#4661E6',
      hexHover: '#7C91F9',
    },
    blue_dark: {
      hexDef: '#3A4374',
      hexHover: '#656EA3',
    },
    purple: {
      hexDef: '#AD1FEA',
      hexHover: '#C75AF6',
    },
    red: {
      hexDef: '#D73737',
      hexHover: '#E98888',
    },
  };

  public static varByT(t: AppBtnVarT): AppBtnClrVarT {
    return this.variables[t];
  }
}
