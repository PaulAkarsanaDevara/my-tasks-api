import { injectable } from 'inversify';

import { IUser, userModel } from '../users/user.model';

@injectable()
export class AuthRepository {
  create(data: IUser) {
    return userModel.create(data);
  }

  findByEmail(email: string) {
    return userModel.findOne({ email });
  }

  findById(id: string) {
    return userModel.findById(id);
  }
}
