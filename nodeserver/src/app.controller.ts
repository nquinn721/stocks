import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HFT } from './core/HFT';
import { WebullBot } from './core/WebullBot';
const wb = new WebullBot();
const hft = new HFT(wb);
// wb.login();
// setTimeout(() => {
setInterval(() => {
  hft.tick(wb);
}, 1000);
// }, 5000);
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'shut up';
  }
}
