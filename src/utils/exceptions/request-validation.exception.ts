import BaseError from '@/utils/exceptions/base.exception';
import Joi from 'joi';

class RequestValidationError extends BaseError {
  public statusCode = 400;

  constructor(public errors: any) {
    super('Bad Request');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err: Joi.ValidationErrorItem) => {
      return {
        message: err.message,
        field: err.path[0],
      };
    });
  }
}

export default RequestValidationError;
