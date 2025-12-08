function cleanInput(input: string) {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return [];
  const words = trimmed.split(/\s+/);
  return words;
};

export { cleanInput };
