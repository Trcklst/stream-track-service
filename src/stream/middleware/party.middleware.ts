import {
  BadRequestException,
  HttpException,
  HttpService,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import configuration from '../../config/configuration';

@Injectable()
export class PartyMiddleware implements NestMiddleware {
  constructor(
    private readonly httpService: HttpService
  ) {}

  async use(req: Request, res: Response, next: Function) {
    const partyId = req.params['partyId'];
    const token = req.headers['authorization'];

    if(!partyId) {
      throw new BadRequestException();
    }

    try {
      const result = await this.httpService
        .get(configuration.services.partyService + partyId, {
          headers: { 'Authorization': token }
        }).toPromise();
      req['party'] = result.data;
    } catch (e) {
      throw new HttpException(e.response.data, e.response.status);
    }

    next();
  }
}
