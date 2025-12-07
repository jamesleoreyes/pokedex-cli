

function cleanInput(input: string): string[] {
  const trimmed = input.trim();
  if (!trimmed) return [];
  const words = trimmed.split(/\s+/);
  return words;
};

export { cleanInput };
