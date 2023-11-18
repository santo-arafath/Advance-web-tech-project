import { Controller, Get, Post, Put, Patch, Delete, Param, Query, Body,  UseInterceptors, UploadedFile, ValidationPipe, UsePipes, ParseIntPipe, Res, Session, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from "multer";
import { RegistrationDto } from './registration.dto';
import {LoginDto} from './login.dto'
import {UpdateProfileDto} from './updateprofile.dto'
import { CreateSolutionDto } from './createsolution.dto';
import { ContactDto } from './contact.dto';
import { PaymentDto } from './payment.dto';
import { RecommendationDto } from './recommendation.dto';
import { ExpertService } from './expert.service';
import { ExpertEntity } from './expert.entity';
import { SolutionEntity } from './expert.entity';
import { SessionGuard } from './expert.guards';
import { MessagingGuard } from './messaging.guards';

@Controller()
export class ExpertController {
  constructor(private readonly expertService: ExpertService) {}

  @Get()
  getHello(): string {
    return this.expertService.getHello();
  }


  @Get('index')
@UseGuards(SessionGuard)
async getIndex(@Session() session) {
const username = session.username; 
const expert = await this.expertService.getExpertByUsername(username);

  if (!expert)
  {
    return { message: 'Expert not found' };
  }
const solutions = await this.expertService.getAllSolutionsByExpertId(expert.id);
console.log(`Username: ${username}`);
return solutions;
}

  

  @Post('registration')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('myCV', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(pdf)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
        }
      },
      limits: { fileSize: 100000000}, 
      storage: diskStorage({
        destination: './upload',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    })
  )
  register(@Body() registrationDto: RegistrationDto,@UploadedFile() myCV: Express.Multer.File) {
    registrationDto.filename = myCV.filename;

    return this.expertService.register(registrationDto)
    };

    @Get('userbyid/:id')
    getUserByID(@Param('id') id:number): Promise<ExpertEntity> {
      return this.expertService.getUserByID(id);
      }

      @Post('login')
      
      async login(@Body() registrationDto: RegistrationDto, @Session() session) {
        if (await this.expertService.login(registrationDto)) {
          session.username = registrationDto.username;
          return true;
        } else {
          throw new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED);
        }
      }

 

 

  @Get('status/:username')
  async getExpertStatusByUsername(@Param('username') username: string) {
    return await this.expertService.getExpertStatusByUsername(username);
  }

  @Put('updateprofile/:id')
  updateProfile(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.expertService.updateProfile(id,updateProfileDto);
  }

  @Get('profile/:id')
  getProfileInfo(@Param('id') id: number) {
    return this.expertService.getProfileInfo(id);
  }
  @Delete('profile/:id')
  deleteProfile(@Param('id') id: number) {
  return this.expertService.deleteProfile(id);
}

  
  

  @Post('postsolution')
  postSolution(@Body() createSolutionDto: CreateSolutionDto) {
    return this.expertService.postSolution(createSolutionDto);

  }

 

  @Get('ratings/:id')
  async viewRatings(@Param('id') id: string) {
    const expert = await this.expertService.getExpertById(parseInt(id, 10));

    if (!expert) {
      throw new Error(`Expert with ID ${id} not found`);
    }

    return {
      ratings: expert.ratings,
      userId: id,
    };
  }

  @UseGuards(MessagingGuard)
  @Post(':senderId/contact/:receiverId')
  async sendMessage(
    @Param('senderId') senderId: number,
    @Param('receiverId') receiverId: number,
    @Body('content') content: string,
  ) {
    const message = await this.expertService.sendMessage(senderId, receiverId, content);
    return {
      message: 'Message sent successfully',
      data: message,
    };
  }
  
  @UseGuards(MessagingGuard) 
  @Get(':senderId/contact/:receiverId/messages')
  async getMessages(
    @Param('senderId') senderId: number,
    @Param('receiverId') receiverId: number,
  ) {
    const messages = await this.expertService.getMessages(senderId, receiverId);
    return {
      messages,
    };
  }
  @Post(':id/payment')
  @UsePipes(new ValidationPipe())
  async receivePayment(@Param('id') id: string, @Body() paymentDto: PaymentDto) {
    const expertId = parseInt(id, 10); 

   
    try {
      const paymentResult = await this.expertService.receivePayment(expertId, paymentDto);

      return {
        message: "Payment received successfully",
        data: paymentResult, 
      };
    } catch (error) {
      throw new HttpException('Failed to process payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id/balance')
  async checkBalance(@Param('id', ParseIntPipe) id: number) {
    const expert = await this.expertService.getExpertById(id);

    if (expert) {
      const balance = expert.balance;
      return {
        balance,
        userId: id,
      };
    } else {
      return {
        message: "Expert not found",
      };
    }
  }

  
  @Patch(':id/change-password')
  changePassword(@Param('id') id: number, @Body() registrationDto: RegistrationDto) {
    
      return this.expertService.changePassword(id,registrationDto);
    }

  
  @Get('/searchsolutionbyquery/')
  @UsePipes(new ValidationPipe({ transform: true }))
  searchUserByQuery(@Query() myquery:object):object{
    return myquery;
  }

  @Post('uploadCV')
@UseInterceptors(
  FileInterceptor('myfile', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/\.(pdf)$/)) {
        cb(null, true);
      } else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
      }
    },
    limits: { fileSize: 10000000 }, 
    storage: diskStorage({
      destination: './upload',
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
      },
    }),
  })
)
uploadFile(@UploadedFile() file: Express.Multer.File) {
  console.log(file);
}

@Get('/getpdf/:name')
 getImages(@Param('name') name:string, @Res() res) {
 res.sendFile(name,{ root: './upload' })
 }


 @Get('getsolutions/:id')
 getSolutions(@Param('id') id:number)
{
return this.expertService.getSolutions(id);
}



@Post('send-email')
  async sendEmail(@Body() emailData: { to: string; subject: string; text: string }) {
    try {
      const { to, subject, text } = emailData;
      await this.expertService.sendEmail(to, subject, text);
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);

     
      throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}