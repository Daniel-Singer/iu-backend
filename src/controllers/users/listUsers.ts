import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';
import { USER_SELECTS } from '../../config/constants';

/**
 * listUsers
 *
 * @description     Returns all users currently stored in database
 * @route           GET /api/v1/users
 * @access          Admin
 */

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.query;
    if (!role || role === '') {
      const users: IUserBase[] = await db('users')
        .select(USER_SELECTS)
        .leftJoin('issue', 'issue.created_from', 'users.id')
        .leftJoin('issue as tutor_issue', 'tutor_issue.assigned_to', 'users.id')
        .count('issue.id as issues_count')
        .count('tutor_issue.id as assigned_count')
        .groupBy(
          'users.id',
          'users.first_name',
          'users.last_name',
          'users.matrikel_nr',
          'users.role',
          'users.email',
          'users.active'
        );
      res.status(200).json(users);
    } else {
      const users: IUserBase[] = await db('users')
        .select(USER_SELECTS)
        .where('role', role)
        .leftJoin('issue', 'issue.created_from', 'users.id')
        .leftJoin('issue as tutor_issue', 'tutor_issue.assigned_to', 'users.id')
        .count('issue.id as issues_count')
        .count('tutor_issue.id as assigned_count')
        .groupBy(
          'users.id',
          'users.first_name',
          'users.last_name',
          'users.matrikel_nr',
          'users.role',
          'users.email',
          'users.active'
        );
      res.status(200).json(users);
    }
  } catch (error) {
    next(error);
  }
};
