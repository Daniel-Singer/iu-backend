import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * deleteIssue
 *
 * @description     Deletes issue row from database
 * @route           DELETE /api/v1/issues/:id
 * @access          Student, Admin
 */

export const deleteIssue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // find issue
    const issue: IIssueReceive = await db('issue')
      .where('id', req.params.id)
      .first();

    if (issue) {
      // check if requesting user is owner or admin
      if (
        req.body.auth.id === issue.created_from ||
        req.body.auth.role === 'admin'
      ) {
        await db('issue').where('id', req.params.id).del();
        res.status(200).json(issue);
      } else {
        res.status(401);
        throw new Error(
          'Sie haben keine Berechtigung diese Fehlermeldung zu löschen'
        );
      }
    } else {
      res.status(404);
      throw new Error('Fehlermeldung konnte nicht gefunden werden');
    }
  } catch (error) {
    next(error);
  }
};
