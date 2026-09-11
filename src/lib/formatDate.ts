export type DateFormatPreset = "short" | "medium" | "long" | "monthYear" | "yearOnly";

export interface FormatDateOptions {
  locale?: string;
  fallback?: string;
  options?: Intl.DateTimeFormatOptions;
  preset?: DateFormatPreset;
}

const PRESETS: Record<DateFormatPreset, Intl.DateTimeFormatOptions> = {
  short: { day: "numeric", month: "numeric", year: "numeric" },
  medium: { day: "numeric", month: "short", year: "numeric" },
  long: { day: "numeric", month: "long", year: "numeric" },
  monthYear: { month: "short", year: "numeric" },
  yearOnly: { year: "numeric" },
};

/**
 * Formats a date string, Date object, or timestamp into a localized formatted string.
 *
 * @param dateInput - The date to format (string, Date, number, null, or undefined)
 * @param options - Options or DateFormatPreset ("short" | "medium" | "long" | "monthYear" | "yearOnly")
 * @param locale - Locale code (defaults to "id-ID")
 * @returns Formatted date string or fallback
 */
export function formatDate(
  dateInput?: string | Date | number | null,
  options?: DateFormatPreset | Intl.DateTimeFormatOptions | FormatDateOptions,
  locale = "en-EN"
): string {
  if (!dateInput) {
    if (typeof options === "object" && options && "fallback" in options && options.fallback !== undefined) {
      return options.fallback;
    }
    return "-";
  }

  let date: Date;

  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === "number") {
    date = new Date(dateInput);
  } else {
    date = new Date(dateInput);
  }

  if (isNaN(date.getTime())) {
    return String(dateInput);
  }

  let formatOptions: Intl.DateTimeFormatOptions = PRESETS.medium;
  let targetLocale = locale;
  let fallback = "-";

  if (typeof options === "string" && options in PRESETS) {
    formatOptions = PRESETS[options as DateFormatPreset];
  } else if (typeof options === "object" && options !== null) {
    if ("preset" in options || "options" in options || "locale" in options || "fallback" in options) {
      const opts = options as FormatDateOptions;
      if (opts.locale) targetLocale = opts.locale;
      if (opts.fallback !== undefined) fallback = opts.fallback;
      if (opts.preset && PRESETS[opts.preset]) {
        formatOptions = { ...PRESETS[opts.preset], ...opts.options };
      } else if (opts.options) {
        formatOptions = opts.options;
      }
    } else {
      formatOptions = options as Intl.DateTimeFormatOptions;
    }
  }

  try {
    return new Intl.DateTimeFormat(targetLocale, formatOptions).format(date);
  } catch {
    return String(dateInput) || fallback;
  }
}

/**
 * Formats a month and year (e.g. "Sep 2023" or "September 2023")
 */
export function formatMonthYear(
  dateInput?: string | Date | number | null,
  shortMonth = true,
  locale = "id-ID"
): string {
  return formatDate(dateInput, {
    preset: "monthYear",
    locale,
    options: { month: shortMonth ? "short" : "long" },
  });
}

/**
 * Formats a full date (e.g. "11 September 2026")
 */
export function formatFullDate(
  dateInput?: string | Date | number | null,
  locale = "id-ID"
): string {
  return formatDate(dateInput, "long", locale);
}

/**
 * Formats a date range (e.g. "Jan 2020 - Des 2022" or "2020 - Present")
 */
export function formatDateRange(
  startDate?: string | Date | number | null,
  endDate?: string | Date | number | null,
  options?: {
    preset?: DateFormatPreset;
    fallbackEnd?: string;
    locale?: string;
  }
): string {
  const { preset = "monthYear", fallbackEnd = "Present", locale = "id-ID" } = options || {};
  const formattedStart = startDate ? formatDate(startDate, preset, locale) : "-";
  const formattedEnd = endDate ? formatDate(endDate, preset, locale) : fallbackEnd;

  return `${formattedStart} - ${formattedEnd}`;
}

export default formatDate;
