import { Router } from 'express';
import { getProfileSettings } from '../portfolioRepository.js';
import { profileSettingsSchema } from '../schemas.js';
import { respondWithSchema } from './respondWithSchema.js';

export const profileRouter = Router();

profileRouter.get('/', async (_req, res, next) => {
  try {
    respondWithSchema(res, profileSettingsSchema, await getProfileSettings());
  } catch (error) {
    next(error);
  }
});
