interface ICommentBase {
  id?: number;
  text: string;
  created_at?: Date;
  updated_at?: Date;
}

// Interface used when comment is created

interface ICommentCreate extends ICommentBase {
  created_from: number;
  issue_id: number;
}

// Interface used when comments are queried

interface ICommentReceive extends ICommentBase {
  created_from: {
    id: number;
    first_name: string;
    last_name: string;
  };
  issue_id: number;
  seen_by_student: Date | null;
  seen_by_tutor: Date | null;
}
