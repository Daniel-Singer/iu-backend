import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * isUserRelatedOrAdmin
 *
 * @description     Makes sure that the requesting user is either related to media or admin
 */

export const isUserRelatedOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth } = req.body;

    if (auth.role === 'admin') {
      next();
    } else {
      const media = await db('issue_media')
        .select('issue_id')
        .where({ id: req.params.id })
        .first();
      const issue = await db('issue')
        .where({ id: media.issue_id })
        .andWhere(function () {
          this.where('created_from', auth.id).orWhere('assigned_to', auth.id);
        })
        .first();
      if (issue) {
        next();
      } else {
        res.status(403);
        throw new Error('Keine Zugriffsberechtigung!');
      }
    }
  } catch (error) {
    next(error);
  }
};
