import { ApolloError } from 'apollo-server-express';

export class UserExistsException extends ApolloError {
  constructor(message: string, code = 'USER_ALREADY_EXISTS') {
    super(message, code);

    Object.defineProperty(this, 'name', { value: 'UserExistsException' });
  }
}
