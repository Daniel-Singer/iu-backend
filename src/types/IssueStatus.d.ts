interface IIssueStatusBase {
  id?: number;
  issue_id: number;
  status_id: number;
  created_from: number;
  updated_from: number | null;
}

interface IIssueStatusReceive {
  id: number;
  created_from: number;
  status: {
    id: number;
    label: string;
  };
  created_at: Date;
  updated_at: Date;
}
