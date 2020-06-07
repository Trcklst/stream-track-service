import { HttpModule, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { StreamController } from './stream.controller';
import { StreamService } from './stream.service';
import { PartyMiddleware } from './middleware/party.middleware';

@Module({
  imports: [HttpModule],
  controllers: [StreamController],
  providers: [StreamService]
})
export class StreamModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PartyMiddleware)
      .forRoutes({ path: 'stream/:partyId/:trackId', method: RequestMethod.ALL });
  }
}
