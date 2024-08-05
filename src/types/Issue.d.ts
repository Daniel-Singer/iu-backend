interface IIssueBase {
  id?: number;
  title: string;
  description: string;
  // created_at: Date;
  // updated_at: Date;
}

interface IIssueCreate extends IIssueBase {
  created_from: number;
  assigned_to: number | null;
  course_id: string;
  category_id: string | null;
}

interface IIssueReceive extends IIssueBase {
  created_from: Partial<IUserStudent>;
  assigned_to: Partial<IUserBase>;
  course: ICourseBase;
  status: {
    id: number;
    label: string;
  };
  created_at: Date;
  updated_at: Date;
}
