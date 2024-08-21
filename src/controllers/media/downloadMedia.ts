import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import path from 'path';

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
    if (!req.body.media) {
      res.status(404);
      throw new Error('Die angeforderte Datei konnte nicht gefunden werden');
    } else {
      const { file_path, mimetype } = req.body.media;

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
