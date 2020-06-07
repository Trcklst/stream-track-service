import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { StreamService } from './stream.service';
import { Response } from 'express';
import { OwnerGuard } from './guard/owner.guard';
import { CurrentTrackGuard } from './guard/currentTrack.guard';

@Controller('stream')
export class StreamController {
  constructor(
    private readonly streamService: StreamService,
  ) {}

  @UseGuards(OwnerGuard, CurrentTrackGuard)
  @Get(':partyId/:trackId')
  async stream(@Param('trackId') trackId : string, @Res() response: Response) {
    const stream = await this.streamService.stream(trackId);
    stream.pipe(response);
  }
}
