import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';
const Eureka = require('eureka-js-client').Eureka;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8050);
  const client = new Eureka({
    instance: {
      app: 'track-stream-service',
      hostName: configuration.eurekaClient.instance.hostName,
      port: {
        '$': configuration.app.port,
        '@enabled': 'true',
      },
      ipAddr: configuration.eurekaClient.instance.hostName,
      vipAddress: configuration.eurekaClient.instance.hostName,
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      }
    },
    eureka: {
      host: configuration.eurekaClient.eureka.host,
      port: configuration.eurekaClient.eureka.port,
      servicePath: '/eureka/apps/',
      maxRetries: 15
    }
  });
  client.start();
}
bootstrap();
