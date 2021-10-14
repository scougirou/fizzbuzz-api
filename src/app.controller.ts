import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('/swagger', 301)
  redirectToSwagger(): void {
    // a get on the root should redirect to swagger, and this comment avoid eslint yelling at me
  }
}
