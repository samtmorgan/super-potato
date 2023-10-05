export function parseAddress(object: any): string {
  //   console.log(object);
  if (!object) return '';
  const res = object.results.find((result: { types: string[] }) => {
    return result.types.includes('postal_code_prefix');
  }).formatted_address;

  return res;
}
