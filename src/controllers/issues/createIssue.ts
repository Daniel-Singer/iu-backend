import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';
import {
  ISSUE_CREATE_BODY,
  NOTIFICATION_FOOTER,
  NOTIFICATION_HEAD,
} from '../../config/constants';

/**
 * createIssue
 *
 * @description     Creates new issue row in categories table
 * @route           POST /api/v1/issues
 * @access          Student, Tutor, Admin
 */

export const createIssue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const trx = await db.transaction();
  try {
    const { auth, issue_media, attached_file, ...issue } = req.body;

    // find course tutor
    const course = await db('course')
      .select(['tutor_id'])
      .where('id', issue.course_id)
      .first();

    // create issue
    const [issueId] = await trx('issue').insert({
      ...issue,
      created_from: auth.id,
      assigned_to: course.tutor_id,
    });

    if (req.body.issue_media && !req.file) {
      // create issue_media
      await trx('issue_media').insert({
        ...issue_media,
        issue_id: issueId,
      });
    }

    if (req.file && req.body.issue_media) {
      const { originalname, mimetype, path } = req.file;
      const { page, line, timestamp, url, label, media_type } =
        req.body.issue_media;
      const mediaData = {
        issue_id: issueId,
        label: label,
        media_type,
        page,
        line,
        timestamp,
        url,
      };
      await trx('issue_media').insert({
        ...mediaData,
        issue_id: issueId,
      });

      await trx('issue_media_file').insert({
        file_path: path,
        issue_id: issueId!,
        name: originalname,
        mimetype,
      });
    }
    // find first status
    const status = await trx('status').first();

    // create issue_status
    await trx('issue_status').insert({
      issue_id: issueId,
      status_id: status.id,
      created_from: auth.id,
    });

    // create notification for student
    await trx('notification').insert({
      recipient_id: auth.id,
      issue_id: issueId,
      subject: 'Neue Meldung aufgenommen',
      head: NOTIFICATION_HEAD['student'],
      body: ISSUE_CREATE_BODY('student', issue?.title),
      footer: NOTIFICATION_FOOTER['student'],
    });

    // create notification for tutor
    await trx('notification').insert({
      recipient_id: course?.tutor_id,
      issue_id: issueId,
      subject: 'Neue Meldung zugewiesen',
      head: NOTIFICATION_HEAD['tutor'],
      body: ISSUE_CREATE_BODY('tutor', issue?.title!),
      footer: NOTIFICATION_FOOTER['tutor'],
    });

    await trx.commit();

    // get issue data
    const issueData: IIssueReceive = await db('issue')
      .where('id', issueId)
      .first();

    // find all related status
    const issueStatus = await db('issue_status')
      .select([
        'issue_status.id',
        'issue_status.created_from',
        'issue_status.created_at',
        'status.id as status_id',
        'status.label as status_label',
        'status.description as status_description',
        'users.id',
        'users.first_name',
        'users.last_name',
      ])
      .join('status', 'issue_status.status_id', 'status.id')
      .leftJoin('users', 'issue_status.created_from', 'users.id')
      .where('issue_id', issueData.id)
      .orderBy('created_at');

    const formattedStatus = issueStatus?.map((status) => ({
      id: status.id,
      label: status.status_label,
      description: status.status_description,
      created_from: {
        id: status.created_from,
        first_name: status.first_name,
        last_name: status.last_name,
      },
      created_at: status.created_at,
    }));

    const returnData = {
      ...issueData,
      status: formattedStatus,
    };

    res.status(201).json(returnData);
  } catch (error) {
    await trx.rollback();
    next(error);
  }
};
