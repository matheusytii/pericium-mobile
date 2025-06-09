export interface createvitimaDTO {
  NIC: string;
  nome: string;
  genero: string;
  documento: number;
  endereco: string;
  etnia: "BRANCO" | "PRETO" | "AMARELO" | "INDIGENA";
  caseId: string;
}

export interface updatevitimaDTO {
  NIC?: string;
  nome?: string;
  genero?: string;
  documento?: number;
  endereco?: string;
  etnia?: "BRANCO" | "PRETO" | "AMARELO" | "INDIGENA";
  caseId?: string;
} 