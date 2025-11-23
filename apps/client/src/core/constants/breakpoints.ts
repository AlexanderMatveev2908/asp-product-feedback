/* eslint-disable no-magic-numbers */
export class BreakCSS {
  public static readonly tablet: number = 768;

  public static isTablet(): boolean {
    try {
      return window.innerWidth > this.tablet;
    } catch {
      return false;
    }
  }
}
