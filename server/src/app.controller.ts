import { Controller, Get, Post, Query, Req, Res} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { v4 as uuid } from 'uuid';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  private url = 'https://accounts.spotify.com/authorize';
  private client_id = '';
  private client_secret = '';
  private scope = 'playlist-modify-public';
  private redirect_uri = 'http://localhost:3000/callback';

  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Post('/login')
  login(@Res() res: Response) {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.client_id,
      scope: this.scope,
      redirect_uri: this.redirect_uri,
      state: uuid().toString(),
    });

    return res.status(200).redirect(`${this.url}?${params.toString()}`);
  }

  @Get('/callback')
  async callback(@Query('code') code: string, @Res() res: Response) {
    const {form, headers, url} = {
      url: ,
      form: ,
      headers: ,
      json: true,
    };
    const response = await firstValueFrom(
      this.httpService.post('https://accounts.spotify.com/api/token', {
        code,
        redirect_url: this.redirect_uri,
        grant_type: 'authroization_code',
      }, {
        headers: {
          Authorization: `Basic ${new Buffer(
              `${this.client_id}:${this.client_secret}`,
          ).toString(`base64`)}`,
        },
      }),
    );

    const params = new URLSearchParams({
      code,
    });
    res.redirect(`/#?${params}`);
  }
}
