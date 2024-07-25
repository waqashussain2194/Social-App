import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  caption: string;

  @Column()
  @Field()
  imageUrl: string;

  @ManyToOne(() => User, user => user.posts)
  @Field(() => User)
  user: User;

  @OneToMany(() => Comment, comment => comment.post)
  @Field(() => [Comment], { nullable: 'itemsAndList' })
  comments: Comment[];

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;
}

