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
  try {
    const { auth, ...issue } = req.body;
    const [issueId] = await db('issue').insert(issue);
    if (issueId) {
      const issues: IIssue[] = await db.select('*').where('id', issueId);
      res.status(201).json(issues);
    } else {
      res.status(400);
      throw new Error();
    }
  } catch (error: any) {
    error.message = 'Fehlermeldung konnte nicht hinzugefügt werden';
    next(error);
  }
};
