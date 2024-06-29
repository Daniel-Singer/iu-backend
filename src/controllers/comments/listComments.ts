import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * listComments
 *
 * @description     Returns all comments currently stored in database
 * @route           GET /api/v1/comments
 * @access          Private
 */

export const listComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { issue_id } = req.params;

    const comments = await db('comment')
      .join('users', 'created_from', 'users.id')
      .select(
        'comment.id',
        'comment.text',
        'comment.issue_id',
        'users.id as user_id',
        'users.first_name as user_first_name',
        'users.last_name as user_last_name',
        'comment.created_at',
        'comment.updated_at'
      )
      .where('issue_id', issue_id)
      .orderBy('created_at', 'desc');

    if (!comments) {
      res.status(404);
      throw new Error('Keine Kommentare für Fehlermeldung vorhanden');
    } else {
      const formatted = comments?.map((comment) => ({
        id: comment.id,
        text: comment.text,
        issue_id: comment.issue_id,
        created_from: {
          id: comment.user_id,
          first_name: comment.user_first_name,
          last_name: comment.user_last_name,
        },
        created_at: comment.created_at,
        updated_at: comment.updated_at,
      }));
      res.status(200).json(formatted);
    }
  } catch (error) {
    next(error);
  }
};
