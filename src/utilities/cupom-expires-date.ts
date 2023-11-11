export function cupomExpiresDate() {
  return new Date(new Date().setDate(new Date().getDate() + 1));
}
