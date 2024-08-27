import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * addMediaDescription
 *
 * @description     Creates a new row in issue_media
 * @route           POST /api/v1/media/description/:id,
 * @access          Private
 */

export const addMediaDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth, ...data } = req.body;
    const issue_media = await db('issue_media')
      .where({ issue_id: req.params.issue_id })
      .first();
    if (issue_media) {
      res.status(409);
      throw new Error(
        'Für diese Fehlermeldung existiert bereits eine Beschreibung'
      );
    } else {
      const issue_media = await db('issue_media').insert(data);
      res.sendStatus(201);
    }
  } catch (error) {
    next(error);
  }
};
