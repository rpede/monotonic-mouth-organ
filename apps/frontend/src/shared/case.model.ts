export interface Case {
  caseNo: string;
  status: string;
  length?: number;
  company: {
    id: number;
    name: string;
  }
}
