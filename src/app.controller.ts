import { Controller, Get, Res } from '@nestjs/common'
import { PrismaService } from './database/prisma.service'
import { Response } from 'express'

@Controller('/user')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}
  @Get()
  async getUser(@Res() res: Response) {
    const user = await this.prisma.user.findFirst({
      where: {
        first_name: 'Arthur',
      },
    })

    return res.status(200).json({
      message: 'User Found Successufuly',
      error: false,
      data: user,
    })
  }
}
