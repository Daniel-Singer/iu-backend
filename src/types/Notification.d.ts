interface INotificationBase {
  id?: number;
  subject: string;
}

interface INotificationCreate extends INotificationBase {
  recipient_id: number;
  issue_id: number;
  head: string;
  body: string;
  footer: string;
}

interface INotificationReceive extends INotificationBase {
  issue: Pick<IIssueBase, 'id', 'title', 'description'>;
  seen: number;
}
