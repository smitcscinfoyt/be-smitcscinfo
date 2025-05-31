import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const errResponse = res as Record<string, any>;
        if (
          typeof errResponse.message === 'string' ||
          Array.isArray(errResponse.message)
        ) {
          message = errResponse.message;
        } else if (
          typeof errResponse.error === 'string' ||
          Array.isArray(errResponse.error)
        ) {
          message = errResponse.error;
        } else {
          message = 'An unexpected error occurred';
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    if (Array.isArray(message)) {
      message = message.join(', ');
    }

    response.status(status).json({
      statusCode: status,
      status: HttpStatus[status].toLowerCase(),
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
