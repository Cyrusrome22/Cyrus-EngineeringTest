import BaseError from '@/utils/exceptions/base.exception';

class NotFoundException extends BaseError {
  public statusCode = 404;
  constructor(public message: string = 'Route not found') {
    super(message);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default NotFoundException;
