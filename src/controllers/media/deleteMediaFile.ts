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
    const issue_file = await db('issue_media_file')
      .where({ id: req.params.id })
      .first();
    if (!issue_file) {
      res.status(404);
      throw new Error('Die zu Löschende Datei konnte nicht gefunden werden');
    } else {
      try {
        const { file_path } = issue_file;
        await fs.access(file_path);
        await trx('issue_media_file').delete().where({ id: req.params.id });
        await trx.commit();
        res.sendStatus(200);
      } catch (error) {
        res.status(400);
        throw new Error(
          'Datei konnte nicht gelöscht werden. Die Datei existiert nicht'
        );
      }
    }
  } catch (error) {
    await trx.rollback();
    next(error);
  }
};
