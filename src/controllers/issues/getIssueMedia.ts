import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * getIssueMedia
 *
 * @description     Returns list of all media for given issue id
 * @route           GET /api/v1/issues/media/:id
 * @access          Private
 */

export const getIssueMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const issue_media = await db('issue_media')
      .select(['id', 'label', 'media_label', 'mimetype'])
      .where('issue_id', req.params.id);
    res.status(200).json(issue_media);
  } catch (error) {
    next(error);
  }
};
