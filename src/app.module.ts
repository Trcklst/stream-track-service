import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StreamModule } from './stream/stream.module';
import { EurekaModule } from 'nestjs-eureka';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMiddleware } from './user/middleware/user.middleware';
const Eureka = require('eureka-js-client').Eureka;

@Module({
  imports: [
    MongooseModule.forRoot(configuration.database.host, {
      useNewUrlParser: true,
      user: configuration.database.user,
      pass: configuration.database.password,
      dbName: configuration.database.dbname
    }),
    JwtModule.register({ secret: configuration.jwtSecret }),
    EurekaModule.forRoot({
      eureka: new Eureka({instance: configuration.eurekaClient.instance, eureka: configuration.eurekaClient.eureka }),
      disableDiscovery: Boolean(configuration.eurekaClient.enable),
      disable: Boolean(configuration.eurekaClient.enable),
    }),
    UserModule,
    StreamModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
