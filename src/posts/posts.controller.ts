import { number } from '@hapi/joi';
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { CreatePostDto } from './dtos/create_post.dto';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
@UseGuards(JwtGuard)
@ApiBearerAuth('defaultBearerAuth')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto, @Req() request) {
    return this.postsService.create(createPostDto, request.user);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'A post has been successfully updated',
    type: CreatePostDto,
  })
  @ApiResponse({
    status: 404,
    description: 'A post with given id does not exist.',
  })
  @Patch(':id')
  updatePost(
    @Param() param: { id: number },
    @Body() createPostDto: CreatePostDto,
    @Req() req,
  ) {
    return this.postsService.update(param.id, createPostDto, req.user);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'A post has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'A post with given id does not exist.',
  })
  async delete(@Param() param: { id: number }) {
    return await this.postsService.delete(param.id);
  }
}
