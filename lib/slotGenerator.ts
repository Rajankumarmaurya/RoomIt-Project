export function generateSlots(
  startTime: string,
  endTime: string,
  bufferMinutes = 30
) {
  const slots: string[] = [];

  let [hour, minute] = startTime
    .split(":")
    .map(Number);

  let [endHour, endMinute] = endTime
    .split(":")
    .map(Number);

  // Buffer time add
  endMinute += bufferMinutes;

  while (endMinute >= 60) {
    endHour++;
    endMinute -= 60;
  }

  while (
    hour < endHour ||
    (hour === endHour &&
      minute < endMinute)
  ) {
    slots.push(
      `${String(hour).padStart(
        2,
        "0"
      )}:${String(minute).padStart(
        2,
        "0"
      )}`
    );

    minute += 30;

    if (minute >= 60) {
      hour++;
      minute = 0;
    }
  }

  return slots;
}