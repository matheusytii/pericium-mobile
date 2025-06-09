export interface CreateEvidenciaDTO {
    title: string;
    descricao: string;
    tipo: string;
    local: string;
    dateRegister: string
    imageUrl: string;
    caseId: string;
  }

export interface UpdateEvidenciaDTO {
    _id: string;
    title: string;
    dateRegister: string;
    local?: string;
    tipo?: string;
    peritoResponsavel?: string;
    descricao?: string;
    caseId: string
  }
