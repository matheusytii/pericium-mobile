export function formatCPF(value: string): string {
  // Remove tudo que não for número
  const cleaned = value.replace(/\D/g, "");

  // Aplica a máscara
  return cleaned
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
