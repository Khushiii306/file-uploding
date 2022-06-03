import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageFileFilter } from "./entities/config";
import { diskStorage } from "multer";
import { PrismaService } from "../prisma/prisma.service";

@Controller('users')
export class UsersController {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  @Post('multiple')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        // filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )

  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const data = {
      fileName: file.filename,
      fileType: file.mimetype,
    }
    return this.prisma.fileData.create({ data });
  }

  @Get('dat/:filepath')
  seeUploadedFile(@Param('filepath') file, @Res() res) {
    console.log('file', file);
    return res.sendFile(file, { root: './uploads' });
  }
}
