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
      instanceId: `track-stream-service:${configuration.app.port}`,
      hostName: configuration.eurekaClient.instance.hostName,
      port: {
        '$': configuration.app.port,
        '@enabled': 'true',
      },
      status: 'UP',
      ipAddr: '0.0.0.0',
      vipAddress: 'track-stream-service',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      }
    },
    eureka: {
      host: configuration.eurekaClient.eureka.host,
      port: configuration.eurekaClient.eureka.port,
      servicePath: '/eureka/apps/',
      maxRetries: 15,
      requestRetryDelay: 2000
    }
  });
  client.start();
}
bootstrap();
