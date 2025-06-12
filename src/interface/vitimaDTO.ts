import { Etnia } from "../types/etnia";

export interface createvitimaDTO {
  _id?: string
  NIC?: string;
  nome?: string;
  genero?: string;
  documento?: string;
  endereco?: string;
  etnia: Etnia;
  caseId: string;
}

export interface updatevitimaDTO {
  NIC?: string;
  nome?: string;
  genero?: string;
  documento?: string;
  endereco?: string;
  etnia?: Etnia;
  caseId?: string;
} 