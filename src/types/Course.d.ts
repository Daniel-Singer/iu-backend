interface ICourseBase {
  id?: number;
  code: string;
  title: string;
}

interface ICourseCreate extends ICourseBase {
  tutor_id: number;
}

interface ICourseReceive extends ICourseBase {}
