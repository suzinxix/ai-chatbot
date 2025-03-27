export function cn(
  ...classes: (string | number | bigint | null | boolean | undefined)[]
) {
  return classes.filter(Boolean).join(" ");
}
