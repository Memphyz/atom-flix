import i18next from "i18next";

export class DateUtils {
  public static formatDate(date: Date | string | number): string {
    const formatted = typeof date === 'string' ? new Date(date) : date;
    return Intl.DateTimeFormat(i18next.language).format(formatted)
  }
}