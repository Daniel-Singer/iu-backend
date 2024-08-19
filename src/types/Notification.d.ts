interface INotificationBase {
  id?: number;
  subject: string;
}

interface INotificationCreate extends INotificationBase {
  recipient_id: number;
  body: string;
  issue_id: number;
}

interface INotificationReceive extends INotificationBase {
  recipient: Pick<IUserBase, 'id' | 'first_name' | 'last_name'>;
  issue: Pick<IIssueBase, 'id', 'title', 'description'>;
}
