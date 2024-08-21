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
    const { file_path, mimetype } = req.body.media;

    const filepath = path.resolve(file_path);

    // read file
    const data = await fs.readFile(filepath);

    res.setHeader('Content-Type', mimetype);
    res.setHeader('Content-Disposition', 'inline');
    res.send(data);
  } catch (error) {
    next(error);
  }
};
