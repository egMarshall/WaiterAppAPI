import { BaseError } from './Base.Error';

export class InvalidInputError extends BaseError {
  constructor(message: string) {
    super(message, 422);
  }
}
