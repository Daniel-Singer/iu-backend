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
    const { auth, media_type, attached_file, ...issue } = req.body;
    const [issueId] = await db('issue').insert({
      ...issue,
      created_from: auth.id,
    });
    if (issueId) {
      const issues: IIssueBase[] = await db
        .select('*')
        .from('issue')
        .where('id', issueId);
      res.status(201).json(issues);
    } else {
      res.status(400);
      throw new Error();
    }
  } catch (error) {
    next(error);
  }
};
