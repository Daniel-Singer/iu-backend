import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * updateIssue
 *
 * @description     Updates issue in database
 * @route           PUT /api/v1/issues/:id
 * @access          Private, User, Admin
 */

export const updateIssue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO - Methode implementieren damit nur eigentümer oder admins update vornehmen können
  try {
    const { auth, ...update } = req.body;
    if (Object.keys(update).length < 1) {
      res.status(400);
      throw new Error('Bitte Daten für Update bereitstellen');
    } else {
      await db('issue')
        .where({ id: req.params.id })
        .first()
        .update({ ...update });

      const issue = await db('issue').where({ id: req.params.id }).first();
      res.status(201).json(issue);
    }
  } catch (error) {
    next(error);
  }
};
