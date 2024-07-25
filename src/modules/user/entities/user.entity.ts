import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, JoinTable } from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The unique identifier of the user.' })
  id: number;

  @Column()
  @Field({ description: 'The full name of the user.' })
  fullName: string;

  @Column({ unique: true })
  @Field({ description: 'The user email address.' })
  @IsEmail()
  email: string;

  @Column({ unique: true })
  @Field({ description: 'The user handle.' })
  handle: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => Date, { description: 'The creation date of the user record.' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field(() => Date, { description: 'The last update date of the user record.' })
  updatedAt: Date;

  @OneToMany(() => Post, post => post.user)
  @Field(() => [Post], { description: 'List of posts by the user.', nullable: 'itemsAndList' })
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  @Field(() => [Comment], { description: 'List of comments made by the user.', nullable: 'itemsAndList' })
  comments: Comment[];

}



