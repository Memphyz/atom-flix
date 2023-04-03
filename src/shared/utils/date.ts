import { Lang } from "../lang";

export class DateUtils {
  public static formatDate(date: Date | string | number): string {
    const formatted = typeof date === 'string' ? new Date(date) : date;
    return Intl.DateTimeFormat(Lang.currentLang.toLowerCase()).format(formatted)
  }
}