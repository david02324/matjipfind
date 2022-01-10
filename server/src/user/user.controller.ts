import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/login/github/callback')
  public async githubLogin(@Query() query: { code: string }) {
    const data = this.userService.getGithubInfo(query.code);

    return data;
  }
}
