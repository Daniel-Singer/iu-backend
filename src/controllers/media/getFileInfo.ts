import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * getFileInfo
 *
 * @description     Returns information of stored file to display in UI
 * @route           GET /api/v1/media/information/:id
 * @access          Private
 */

export const getFileInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file_info = await db('issue_media_file')
      .select(['id', 'file_path', 'mimetype', 'name', 'created_at'])
      .where({
        issue_id: req.params.id,
      });
    res.status(200).json(file_info);
  } catch (error) {
    next(error);
  }
};
