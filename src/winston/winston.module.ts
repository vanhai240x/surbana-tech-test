import { Module } from '@nestjs/common';
import { WinstonModule as NestWinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    NestWinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
              return `${timestamp} [${level}] ${message}`;
            }),
          ),
        }),
        new winston.transports.File({ filename: 'logs/app.log' }),
      ],
    }),
  ],
})
export class WinstonModule {}