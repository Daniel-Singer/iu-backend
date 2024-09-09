import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { DOCUMENT_DIR, DOCUMENT_DIR_DEV } from '../../config/constants';
import path from 'path';

/**
 * downloadDocument
 *
 * @description     Downloads pdf from filesystem
 * @route           GET /api/v1/documents/:name
 * @access          Private
 */

export const downloadDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filename } = req.query;
    const { auth } = req.body;
    const PATH =
      process.env.IU_DOCUMENT_PATH === 'development'
        ? DOCUMENT_DIR_DEV
        : DOCUMENT_DIR;
    const filePath = path.join(PATH, auth?.role, filename as string);
    const exists = fs.existsSync(filePath);
    if (!exists) {
      res.status(404);
      throw new Error(
        'Das von Ihnen angeforderte Dokument konnte nicht gefunden werden'
      );
    } else {
      const file = fs.createReadStream(filePath);
      const stat = fs.statSync(filePath);
      res.setHeader('Content-Lenght', stat.size);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename}"`
      );
      file.pipe(res);
    }
  } catch (error) {
    next(error);
  }
};
