export interface CreateEvidenciaDTO {
    title: string;
    description: string;
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
    description?: string;
    caseId: string
  }
