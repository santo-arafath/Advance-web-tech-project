
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminInfoDTO } from './Admin.dto';
import { AdminEntity } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}



  async addAdmin(adminInfo: AdminInfoDTO): Promise<AdminEntity> {
    const newAdmin = this.adminRepository.create(adminInfo);
    return await this.adminRepository.save(newAdmin);
  }




  getAdminById(id:number): Promise<AdminEntity> {
    const admin = this.adminRepository.findOneBy({id:id});
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
    }


    updateAdmin(id:number, adminInfo:AdminInfoDTO):Promise<AdminEntity>
    {
     const res=  this.adminRepository.update(id,adminInfo);
  
       return this.adminRepository.findOneBy({id});
    }
    
    
  

  

    deleteAdmin(id:number):any
    {
     const res=  this.adminRepository.delete(id);
  
       return "Admin Deleted"
    }


      
    updateAdminpassword(id:number, adminInfo:AdminInfoDTO):Promise<AdminEntity>
    {
     const res=  this.adminRepository.update(id,adminInfo);
  
       return this.adminRepository.findOneBy({id});
    }




    async getDashboardStats(): Promise<any> {

      const totalAdmins =  await this.adminRepository.count();
      return {"Total Admin :" : totalAdmins};
      }


      async getAllAdmin(): Promise<AdminEntity[]> {
        return this.adminRepository.find();
      }

}
