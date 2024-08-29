import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import { DOCUMENT_DIR, DOCUMENT_DIR_DEV } from '../../config/constants';
import path from 'path';

/**
 * listDocuments
 *
 * @description     Returns data from all documents
 * @route           GET /api/v1/documents
 * @access          Private
 */

export const listDocuments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth } = req.body;

    const PATH =
      process.env.NODE_ENV === 'development' ? DOCUMENT_DIR_DEV : DOCUMENT_DIR;

    const files = await fs.readdir(path.join(PATH, auth?.role));

    const stats = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(PATH, auth?.role, file);
        const fileStats = await fs.stat(filePath);
        return {
          filename: file,
          size: fileStats.size,
          created_at: fileStats.birthtime,
        };
      })
    );
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};
