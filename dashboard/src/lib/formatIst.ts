const IST = "Asia/Kolkata";

export function formatIstDateTime(now = new Date()): string {
  const date = now
    .toLocaleDateString("en-GB", {
      timeZone: IST,
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase()
    .replace(/ /g, " ");

  const time = now.toLocaleTimeString("en-GB", {
    timeZone: IST,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return `${date}, ${time} IST`;
}

export function formatIstTime(now = new Date()): string {
  return (
    now.toLocaleTimeString("en-GB", {
      timeZone: IST,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }) + " IST"
  );
}

export function formatIstDate(now = new Date()): string {
  return now
    .toLocaleDateString("en-GB", {
      timeZone: IST,
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}
