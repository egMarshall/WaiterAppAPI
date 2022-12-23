import { BaseError } from './Base.Error';

export class MethodNotAllowedError extends BaseError {
  constructor(message: string) {
    super(message, 405);
  }
}
