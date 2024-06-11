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
    const issue: IIssueBase = await db('issue')
      .where('id', req.params.id)
      .first();
    if (issue) {
      if (req.body.auth.role !== 'tutor') {
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
