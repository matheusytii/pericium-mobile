
export function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Erro ao decodificar token jwt", e);
    return null;
  }
}
