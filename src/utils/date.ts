export const dateTimeFormatter = (
  style: Intl.DateTimeFormatOptions["dateStyle"] = "short",
  locale = "en-US"
) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: style,
  });
