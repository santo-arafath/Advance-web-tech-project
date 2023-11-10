import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { AdminInfoDTO } from './Admin.dto';
import { AdminEntity } from './Admin.entity';
import { AdminService } from './admin.service';


@Controller('/admin') 
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  getHello() {
    return "hello";
  }



  
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


@Get('/searchadminby/:id')
searchUserBy(@Param('id') userID:number): Promise<AdminEntity> {
return this.adminService.getAdminById(userID);
}


@Put('/update/:id')
updateAdmin(@Param('id') id:number, @Body() adminInfo:AdminInfoDTO)
{
  return this.adminService.updateAdmin(id,adminInfo);
}

@Delete('/delete-admin/:id')
 deleteAdmin(@Param('id') adminId: number) {
  return this.adminService.deleteAdmin(adminId);
}


@Patch('update-admin_password/:id')
   updateAdminPassword(@Param('id') adminId: number, @Body() updatedUserInfo: AdminInfoDTO) {
    return this.adminService.updateAdminpassword(adminId,updatedUserInfo);
  }



  @Get('/dashboard-status')
   getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('/All_Admin')
   getAllAdmin() {
    return this.adminService.getAllAdmin();
  }

  

  // @Post('create-expert')
  // createExpert(@Body() expertInfo: any) {
  // }

  // @Put('update-expert/:id')
  // updateExpert(@Param('id') expertId: number, @Body() updatedExpertInfo: any) {
  // }

  // @Delete('delete-expert/:id')
  // deleteExpert(@Param('id') expertId: number) {
  // }

  // @Get('expert-details/:id')
  // getExpertDetails(@Param('id') expertId: number) {
  // }

  // @Post('create-farmer')
  // createFarmer(@Body() farmerInfo: any) {
  // }

  // @Put('update-farmer/:id')
  // updateFarmer(@Param('id') farmerId: number, @Body() updatedFarmerInfo: any) {
  // }

  // @Delete('delete-farmer/:id')
  // deleteFarmer(@Param('id') farmerId: number) {
  // }

  // @Get('farmer-details/:id')
  // getFarmerDetails(@Param('id') farmerId: number) {
  // }

  // @Post('create-vet')
  // createVeterinary(@Body() vetInfo: any) {
  // }

  // @Put('update-vet/:id')
  // updateVeterinary(@Param('id') vetId: number, @Body() updatedVetInfo: any) {
  // }

  // @Delete('delete-vet/:id')
  // deleteVeterinary(@Param('id') vetId: number) {
  // }

  // @Get('vet-details/:id')
  // getVetDetails(@Param('id') vetId: number) {
  // }

  // @Get('dashboard-stats')
  // getDashboardStats() {
  // }

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
