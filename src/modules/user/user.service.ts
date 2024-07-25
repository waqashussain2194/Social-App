import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountCreateInput } from '../auth/dto/account-create.input';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    
  ) {}

  async create(accountCreateInput: AccountCreateInput) {
    return await this.userRepository.save(
      this.userRepository.create(accountCreateInput)
    );
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['posts'],
    });
  }
  
  // findAll() {
  //   return this.userRepository.find({});
  // }

  async findByEmailOrHandle(email: string, handle?: string) {
    const user = await this.userRepository.findOne({
      where: [
        { email: email },
        { handle: handle }
      ]
    }).catch(err => {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    });

    return user;
  }
  
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
  }

  async me(id: number) {
    return this.userRepository.findOne({
      where: {
        id: id
      }
    });
  }


}

  