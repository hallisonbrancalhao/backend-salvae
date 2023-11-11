export function generateToken() {
  const codigo = new Date().getTime().toString();
  return codigo.slice(codigo.length - 6, codigo.length);
}
