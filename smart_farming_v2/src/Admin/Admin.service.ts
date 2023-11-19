
import { MailerService } from "@nestjs-modules/mailer/dist";
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ExpertEntity } from 'src/Expert/Expert.entity';
import { VatEntity } from 'src/Veterinary/Vaterinary.entity';
import { Repository } from 'typeorm';
import { AdminInfoDTO } from './Admin.dto';
import { AdminEntity} from './admin.entity';
import { FarmerEntity } from 'src/farmer/farmer.entity';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly mailerService: MailerService,

    @InjectRepository(ExpertEntity) 
    private readonly ExpertRepository: Repository<ExpertEntity>,

    @InjectRepository(FarmerEntity) 
    private readonly FarmerRepository: Repository<FarmerEntity>,

    @InjectRepository(VatEntity) 
    private readonly VatRepository: Repository<VatEntity>

    


    
  ) {}

//-------------------------------------------------------------




  //-------------------------------------
  async getUserInfo(usid: string): Promise<AdminEntity> {
    const userId = parseInt(usid, 10);
    
    return  await this.adminRepository.findOne({ where: { id:userId  }});

  }


  //-------------------------------------

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



      
    async updateAdminpassword(id:number, adminInfo:AdminInfoDTO):Promise<AdminEntity>
    {
       
       await this.mailerService.sendMail({to: 'arafath.hossen.santo97193@gmail.com',
       subject: 'subject of email',
       text: 'otp:12345',
            });

            
            
     const res=  this.adminRepository.update(id,adminInfo);
  
       return this.adminRepository.findOneBy({id});
    }






    async getDashboardStats(): Promise<any> {

      const totalAdmins =  await this.adminRepository.count();
      const totalFarmer =  await this.FarmerRepository.count();
      const totalExpert =  await this.ExpertRepository.count();
      const totalVat =  await this.VatRepository.count();

      const totalUser= await (totalAdmins+totalFarmer+totalExpert+totalVat);

      return {"Total Admin :" : totalAdmins,"Total_ Farmer :" : totalFarmer,"Total Expert :" : totalExpert,"Total Vat :" : totalVat,"Total User":totalUser};
      }


      async getAllAdmin(): Promise<AdminEntity[]> {
        return this.adminRepository.find();
      }




      async login(admininfo: AdminInfoDTO): Promise<any> {
        const admin = await this.adminRepository.findOneBy({ username: admininfo.username });
    
        if (!admin) {
          return "Wrong password";
        }
        
        const addmin = await bcrypt.compare(admininfo.password.trim(), admin.password.trim());
    
        return admin;
      }








      //----------------------------expert-------------------------------------


      addExpert(expertInfo)
      {
         return this.ExpertRepository.save(expertInfo);
      }


      getExpertById(id:number): Promise<ExpertEntity> {
        const ex = this.ExpertRepository.findOneBy({id:id});
        if (!ex) {
          throw new NotFoundException('Expert not found');
        }
        return ex;
        }




        deleteExpert(id:number):any
    {
     const res=  this.ExpertRepository.delete(id);
  
       return "Expert Deleted"
    }


    updateExpert(id:number, expertInfo:any):Promise<ExpertEntity>
    {
     const res=  this.ExpertRepository.update(id,expertInfo);
  
       return this.ExpertRepository.findOneBy({id});
    }
    

      //----------------------------expert-------------------------------------
      //----------------------------Farmer-------------------------------------

      async addFarmer(FarmerInfo:FarmerEntity): Promise<FarmerEntity> {
        const newFarmer = this.FarmerRepository.create(FarmerInfo);
        return await this.FarmerRepository.save(newFarmer);
      }


      getFarmerById(id:number): Promise<FarmerEntity> {
        const farmer = this.FarmerRepository.findOneBy({id:id});
        if (!farmer) {
          throw new NotFoundException('farmer not found');
        }
        return farmer;
        }


       
    deleteFarmer(id:number):any
    {
     const res=  this.FarmerRepository.delete(id);
  
       return "Farmer Deleted"
    } 
      //----------------------------Farmer end-------------------------------------
      //----------------------------Vat -------------------------------------

      async addVat(VatInfo:VatEntity): Promise<VatEntity> {
        const newVat = this.VatRepository.create(VatInfo);
        return await this.VatRepository.save(newVat);
      }


      getVatById(id:number): Promise<VatEntity> {
        const vat = this.VatRepository.findOneBy({id:id});
        if (!vat) {
          throw new NotFoundException('Vat not found');
        }
        return vat;
        }


       
    deleteVat(id:number):any
    {
     const res=  this.VatRepository.delete(id);
  
       return "Vat Deleted"
    } 
      //----------------------------vat end-------------------------------------


      
  // ------------------------mailer--------------------------



}
