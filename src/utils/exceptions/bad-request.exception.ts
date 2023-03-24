import BaseError from '@/utils/exceptions/base.exception';

class BadRequestException extends BaseError {
  public statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestException.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default BadRequestException;
