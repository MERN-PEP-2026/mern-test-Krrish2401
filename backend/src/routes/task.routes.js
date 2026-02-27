import { Router } from 'express';
import {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
} from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import {
    createTaskValidation,
    updateTaskValidation,
    validate,
} from '../middleware/validation.middleware.js';

const router = Router();

router.use(protect);

router.post('/', createTaskValidation, validate, createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', updateTaskValidation, validate, updateTask);
router.delete('/:id', deleteTask);

export default router;
