import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa';

export default (err: any, req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const statusCode: number = err.status || 500;
    const message: string = err.message || 'Something went wrong';

    console.error(`[${req.method}] ${req.path}`, err);

    if (err instanceof ValidateError || err.name === 'ValidationError') {
      return res.status(422).json({
        statusCode: 422,
        message: 'Request could not be validated',
        details: err?.fields || err?.errors,
      });
    }

    if (err?.code === 11000) {
      return res.status(409).json({
        statusCode: 409,
        message: 'Duplicate key error: The provided resource already exists.',
        details: err?.fields,
      });
    }

    if (err.name === 'CastError') {
      return res.status(400).json({
        statusCode: 400,
        message: 'Invalid data provided',
        details: err?.message,
      });
    }

    return res.status(statusCode).json({ statusCode, message });
  } catch (err) {
    next(err);
  }
};
