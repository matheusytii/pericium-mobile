import { Status } from "../types/status";

export interface CreateCaseDTO {
    _id?: string;
    titulo: string;
    descricao: string;
    status: Status
    dataAbertura: string;
    userId: string;
  }
