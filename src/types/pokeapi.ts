export type LocationAreaResponse = {
  count: number;
  next: string;
  previous: string | null;
  results: FlatLocationArea[];
}

type FlatLocationArea = {
  name: string;
  url: string;
}
