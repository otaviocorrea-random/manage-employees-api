import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<a href="/doc">View API Documentation</a>';
  }
}
