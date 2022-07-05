import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create_post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepo: Repository<Post>,
  ) {}

  create(createPostDto, author) {
    const post = this.postsRepo.create({ ...createPostDto, author });
    return this.postsRepo.save(post);
  }
  async update(id: number, updatedPost: CreatePostDto, author: User) {
    const post = await this.postsRepo.findOne({ where: { id } });
    post.title = updatedPost.title;
    post.content = updatedPost.content;
    post.author = author;
    return await this.postsRepo.save(post);
  }
  async find(postId) {
    return this.postsRepo.findOne({ where: { id: postId } });
  }
  async delete(id: number) {
    const post = await this.find(id);
    if (!post) {
      throw new HttpException(
        'Given postid not found in the database',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.postsRepo.delete(id);
  }
}
