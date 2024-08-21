import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import { db } from '../../config/db';

/**
 * deleteMediaFile
 *
 * @description     Deletes Media File from database
 * @route           DELETE /api/v1/media/:id
 * @access          Private
 */

export const deleteMediaFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const trx = await db.transaction();
  try {
    try {
      const { file_path } = req.body.media;
      await fs.access(file_path);
      await trx('issue_media').delete().where({ id: req.body.media.id });
      await trx.commit();
      res.sendStatus(200);
    } catch (error) {
      res.status(400);
      throw new Error(
        'Datei konnte nicht gelöscht werden. Die Datei existiert nicht'
      );
    }
  } catch (error) {
    await trx.rollback();
    next(error);
  }
};
