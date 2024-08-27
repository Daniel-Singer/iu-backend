import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { db } from '../../config/db';

/**
 * downloadMedia
 *
 * @description     Downloads media with requested id
 * @route           GET /api/v1/media/:id
 * @access          Private
 */

export const downloadMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const issue_file = await db('issue_media_file')
      .where({
        id: req.params.id,
      })
      .first();
    if (!issue_file) {
      res.status(404);
      throw new Error('Die angeforderte Datei konnte nicht gefunden werden');
    } else {
      const { file_path, mimetype } = issue_file;

      const filepath = path.resolve(file_path);

      // read file
      const data = await fs.readFile(filepath);

      res.setHeader('Content-Type', mimetype);
      res.setHeader('Content-Disposition', 'inline');
      res.status(200);
      res.send(data);
    }
  } catch (error) {
    next(error);
  }
};
