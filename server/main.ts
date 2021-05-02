import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Log } from './common/utils/logging/Log';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as figlet from 'figlet';
import session from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';
import cookieParser from 'cookie-parser';
import { config } from 'aws-sdk';
process.env.BABEL_ENV = 'development';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Allows us to recieve cookies and send out cookies
  app.use(cookieParser(process.env.SECRET_KEY));

  //Security
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ['self', '*', 'data: https'],
        "upgrade-insecure-requests": [],
      }
    }
  }));

  //Allow us to recieve JSON files
  app.use(
    bodyParser.json({
      limit: '50mb',
      strict: true,
    }),
  );

  app.useStaticAssets(join(__dirname, 'static'), { prefix: '*/static/' });

  app.setBaseViewsDir(join(__dirname, '..', 'public'));

  app.setViewEngine('hbs');

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  app.listen(process.env.PORT || 3000, () => {
    Log.config.info(`Started the API on port ${process.env.PORT || 3000}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
