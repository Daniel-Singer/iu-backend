interface ICourseBase {
  id?: number;
  code: string;
  title: string;
}

// TODO - 1 - key active mit type number hinzufügen

interface ICourseCreate extends ICourseBase {
  tutor_id: number;
}

interface ICourseReceive extends ICourseBase {}
