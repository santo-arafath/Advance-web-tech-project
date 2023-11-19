import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { AdminInfoDTO, LoginDto } from './Admin.dto';
import { AdminEntity } from './Admin.entity';
import { SessionGuard } from './Admin.guards';
import { AdminService } from './admin.service';
import { ExpertEntity } from 'src/Expert/Expert.entity';
import { FarmertEntity } from 'src/farmer/farmer.entity';


@Controller('/admin') 
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Get()
  // getHello(@Session() session) {
  //   session.username = "amin";
  //   session.usid = 2;
  //   return (
  //     session.username+
  //     session.usid
    
  //   );
  // }


//-------------------------------------------------------

@Post('/login')  
async login(@Body() AdminInfo: AdminInfoDTO, @Session() session) {
  const admin =await this.adminService.login(AdminInfo) 
  if(admin!="Wrong password"){
    session.username = AdminInfo.username;
    session.usid=admin.id;
    return "logged in " + session.usid;
  } else {
    throw new HttpException('UnauthorizedException--2', HttpStatus.UNAUTHORIZED);
  }
}
//-------------------------------------------------------



@Post('/logout')
//@UseGuards(SessionGuard)
logout(@Session() session) {
  
  if (session.username) {
   
    session.destroy()
    return { message: 'Logout successful' };
  } else {
    return { message: 'User not logged in' };
  }
}

//-----------------------------------------------

 



  
  @Post('/add_admin')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('filename',
  { fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
             }
                                    },

  limits: { fileSize: 80000 },
  storage:diskStorage({
  destination: './upload',
  filename: function (req, file, cb) {
   cb(null,Date.now()+file.originalname)
  },
  })
}
))
addAdmin(@Body() adminInfo:AdminInfoDTO, @UploadedFile()  myfile: Express.Multer.File) {
  adminInfo.filename = myfile.filename;
return this.adminService.addAdmin(adminInfo);
}




@Get('/my-info')
  async getUserInfo(@Session() session) {

    console.log(session.usid);
    if (session.usid) {
      return await this.adminService.getUserInfo(session.usid);
       
    } else {
      throw new UnauthorizedException('User not logged in');
    }
  }




@Get('/searchadminby/:id')
@UseGuards(SessionGuard)
searchUserBy(@Param('id') userID:number): Promise<AdminEntity> {
return this.adminService.getAdminById(userID);
}




@Put('/update/:id')
@UseGuards(SessionGuard)
updateAdmin(@Param('id') id:number, @Body() adminInfo:AdminInfoDTO)
{
  return this.adminService.updateAdmin(id,adminInfo);
}

@Delete('/delete-admin/:id')
@UseGuards(SessionGuard)
 deleteAdmin(@Param('id') adminId: number) {
  return this.adminService.deleteAdmin(adminId);
}


@Patch('update-admin_password/:id')
//@UseGuards(SessionGuard)
   updateAdminPassword(@Param('id') adminId: number, @Body() updatedUserInfo: AdminInfoDTO) {
    return this.adminService.updateAdminpassword(adminId,updatedUserInfo);
  }



  @Get('/dashboard-status')
  @UseGuards(SessionGuard)
   getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('/All_Admin')
  @UseGuards(SessionGuard)
   getAllAdmin() {
    return this.adminService.getAllAdmin();
  }

  



//---------------------------------------------------------------------------------------


@Post('/addexpert')
@UseGuards(SessionGuard)
addExpert(@Body() expertInfo)
{
return this.adminService.addExpert(expertInfo);
}







   @Put('update-expert/:id')
   @UseGuards(SessionGuard)
   updateExpert(@Param('id') expertId: number, @Body() updatedExpertInfo: any) {
     
    return this.adminService.updateExpert(expertId,updatedExpertInfo);
   }

  @Delete('delete-expert/:id')
  @UseGuards(SessionGuard)
  deleteExpert(@Param('id') expId: number) {
    return this.adminService.deleteExpert(expId);
  }


  @Get('expert-details/:id')
  @UseGuards(SessionGuard)
    ExpertUserBy(@Param('id') userID:number): Promise<ExpertEntity> {
      return this.adminService.getExpertById(userID);
  }






   @Post('/add_farmer')
   @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('filename',
  { fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
             }
                                    },

  limits: { fileSize: 800000 },
  storage:diskStorage({
  destination: './upload_farmer',
  filename: function (req, file, cb) {
   cb(null,Date.now()+file.originalname)
  },
  })
}
))
addFarmer(@Body() farmerInfo:any, @UploadedFile()  myfile: Express.Multer.File) {
  farmerInfo.filename = myfile.filename;
return this.adminService.addFarmer(farmerInfo);
}


@Get('farmer-details/:id')
@UseGuards(SessionGuard)
  async getFarmerDetails(@Param('id') farmerId: number) {
    const farmer = await this.adminService.getFarmerById(farmerId);
    return farmer; 
}


  // @Put('update-farmer/:id')
  // updateFarmer(@Param('id') farmerId: number, @Body() updatedFarmerInfo: any) {
  // }



  @Delete('delete-farmer/:id')
  @UseGuards(SessionGuard)
  async deleteFarmer(@Param('id') farmerId: number) {
    return await this.adminService.deleteFarmer(farmerId);
  }

  

  @Post('/add_Vat')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('filename',
  { fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
             }
                                    },

  limits: { fileSize: 800000 },
  storage:diskStorage({
  destination: './upload_Vat',
  filename: function (req, file, cb) {
   cb(null,Date.now()+file.originalname)
  },
  })
}
))
addVat(@Body() VatInfo:any, @UploadedFile()  myfile: Express.Multer.File) {
  VatInfo.filename = myfile.filename;
return this.adminService.addVat(VatInfo);
}

  // @Put('update-vet/:id')
  // updateVeterinary(@Param('id') vetId: number, @Body() updatedVetInfo: any) {
  // }

  @Delete('delete-vet/:id')
  @UseGuards(SessionGuard)
  async deleteVeterinary(@Param('id') vatId: number) {

    return this.adminService.deleteVat(vatId);
  }

  @Get('vet-details/:id')
  @UseGuards(SessionGuard)
  async getVetDetails(@Param('id') vetId: number) {
    const farmer = await this.adminService.getVatById(vetId);
    return farmer; 
  }



  // ------------------------mailer--------------------------

  

  // @Patch('update-user/:id')
  // updateUserPartially(@Param('id') userId: number, @Body() updatedUserInfo: any) {
  // }

  // @Patch('activate-user/:id')
  // activateUser(@Param('id') userId: number) {
  // }

  // @Post('create-vet')
  // createVeterinarian(@Body() veterinarianInfo: any) {
  // }

  // @Get('vet-list')
  // getAllVeterinarians() {
  // }
}
