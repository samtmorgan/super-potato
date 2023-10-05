export function parseAddress(object: any): string {
  const res = object.results.find((result: { types: string[] }) => {
    return result.types.includes('postal_code_prefix');
  }).formatted_address;

  return res;
}
