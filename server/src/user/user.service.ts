import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  public async getGithubInfo(code: string) {
    const getTokenUrl = 'https://github.com/login/oauth/access_token';

    const request = {
      code: code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
    };

    const response: AxiosResponse = await axios.post(getTokenUrl, request, {
      headers: {
        accept: 'application/json',
      },
    });

    if (response.data.error) {
      throw new HttpException('Something wrong!', HttpStatus.FORBIDDEN);
    }

    const accessToken = response.data.access_token as string;

    const getDataUrl = 'https://api.github.com/user';
    const { data } = await axios.get(getDataUrl, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const user = new UserDto();
    user.id = data.id;
    user.username = data.login;

    return user;
  }
}
