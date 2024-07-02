import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

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
    const { auth, media_type, attached_file, ...issue } = req.body;

    // create issue
    const [issueId] = await trx('issue').insert({
      ...issue,
      created_from: auth.id,
    });

    // find first status
    const status = await trx('status').first();

    // create issue_status
    const [issueStatusId] = await trx('issue_status').insert({
      issue_id: issueId,
      status_id: status.id,
      created_from: auth.id,
    });

    await trx.commit();

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
      // TODO - find out why created at is not displayed
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
