interface IIssue {
  id?: number;
  title: string;
  text: string;
  created_from: number;
  alligned_to: number | null;
  course_id: number;
  category_id: number | null;
  created_at: Date;
  updated_at: Date;
}
