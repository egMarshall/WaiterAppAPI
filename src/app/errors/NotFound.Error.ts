import { BaseError } from './Base.Error';

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}
