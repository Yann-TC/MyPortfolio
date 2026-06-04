import { Router } from 'express';
import { getProjects } from '../portfolioRepository.js';
import { projectSchema } from '../schemas.js';
import { respondWithSchema } from './respondWithSchema.js';

export const projectRouter = Router();

projectRouter.get('/', async (_req, res, next) => {
  try {
    respondWithSchema(res, projectSchema.array(), await getProjects());
  } catch (error) {
    next(error);
  }
});
