interface IIssueBase {
  id?: number;
  title: string;
  description: string;
  created_from: number;
  alligned_to: number | null;
  course_id: number;
  category_id: number | null;
  created_at: Date;
  updated_at: Date;
}

interface IIssueJoin extends IIssueBase {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  matrikel_nr: number | null;
}
