import Task from '../models/Task.model.js';
import { AppError } from '../middleware/errorHandler.js';

export const createTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            createdBy: req.user.id,
        });

        res.status(201).json({
            success: true,
            data: { task },
        });
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const { status } = req.query;
        const filter = { createdBy: req.user.id };

        if (status && ['pending', 'completed'].includes(status)) {
            filter.status = status;
        }

        const tasks = await Task.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: { tasks },
        });
    } catch (error) {
        next(error);
    }
};

export const getTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            createdBy: req.user.id,
        });

        if (!task) {
            return next(new AppError('Task not found', 404));
        }

        res.status(200).json({
            success: true,
            data: { task },
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user.id },
            { title, description, status },
            { new: true, runValidators: true }
        );

        if (!task) {
            return next(new AppError('Task not found', 404));
        }

        res.status(200).json({
            success: true,
            data: { task },
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.id,
        });

        if (!task) {
            return next(new AppError('Task not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
