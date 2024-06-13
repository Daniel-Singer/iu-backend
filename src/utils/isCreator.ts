/**
 * isCreator
 *
 * @description     Performs a check if requesting user is creator of db entry
 */

export const isCreator = (created_from: number, user_id: number) =>
  created_from === user_id;
