import { BadRequestException, Body, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpertEntity, SolutionEntity } from './expert.entity';
import { Repository } from 'typeorm';
import { RegistrationDto } from './registration.dto';
import { CreateSolutionDto } from './createsolution.dto';
import { UpdateProfileDto } from './updateprofile.dto';
import { ProfileEntity } from './updateprofile.entity';
import * as bcrypt from 'bcrypt';
import { Message } from './message.entity';
import { PaymentDto } from './payment.dto';
//import { RecommendationEntity } from './recommendation.entity';
import { RecommendationDto } from './recommendation.dto';
import { validate } from 'class-validator';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ExpertService {
  
constructor(
  @InjectRepository(ExpertEntity)
  private expertRepo: Repository <ExpertEntity>,
  @InjectRepository(SolutionEntity)
  private solutionRepo: Repository <SolutionEntity>,
  @InjectRepository(ProfileEntity)
  private profileRepo: Repository <ProfileEntity>,
  @InjectRepository(Message)
  private messageRepo: Repository <Message>,
  private readonly mailerService: MailerService,
  
)
{
  
}
  getHello(): string {
    return 'Hello World!';
  }

  getAll(): Promise<ExpertEntity[]> {
    return this.expertRepo.find(
      {
        select:{
        
          username: true
        
        }
        
      }
    );
  }

    getUserByID(id:number): Promise<ExpertEntity> {
    return this.expertRepo.findOneBy({id:id});
    }

    async register(registrationDto:RegistrationDto): Promise<ExpertEntity[]> {
      const password = registrationDto.password;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      
     
      registrationDto.password = hashedPassword;
      
      const res = await this.expertRepo.save(registrationDto);
      return this.expertRepo.find();
    }
  
    async changePassword(id: number, registrationDto: RegistrationDto): Promise<ExpertEntity> {
      const password = registrationDto.password;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      
      
      registrationDto.password = hashedPassword;
      
      const res = await this.expertRepo.update(id, registrationDto);
      return this.expertRepo.findOneBy({id});
    }
  

  

    async postSolution(createSolutionDto: CreateSolutionDto): Promise<SolutionEntity[]> {
      const expert = await this.expertRepo.findOne({
        where: { id: createSolutionDto.expertId }
      });
    
      if (!expert) {
        throw new Error(`Expert with id ${createSolutionDto.expertId} not found`);
      }
    
      const solution = new SolutionEntity();
      solution.title = createSolutionDto.title;
      solution.description = createSolutionDto.description;
      solution.category = createSolutionDto.category;
      solution.expert = expert;
    
      const validationResult = await validate(solution);
    
      if (validationResult.length > 0) {
       
        throw new BadRequestException(validationResult);
      }
    
      await this.solutionRepo.save(solution);
    
      return this.solutionRepo.find();
    }

  getSolutions(id: number) {
    return this.expertRepo.find(
      {

        where:{id:id},
        relations:{solutions:true}
      })
  }
  
  async updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<ProfileEntity> {
    const expert = await this.expertRepo.findOne({
      where: { id },
      relations: ['uprofile']
    });
  
    if (!expert) {
      throw new HttpException('Expert not found', HttpStatus.NOT_FOUND);
    }
  
    const { firstName, lastName, phoneNumber } = updateProfileDto;
  
    expert.uprofile = {
      ...expert.uprofile,
      firstName,
      lastName,
      phoneNumber,
    };
  
    try {
      const updatedExpert = await this.expertRepo.save(expert);
      return updatedExpert.uprofile;
    } catch (error) {
      throw new HttpException('Error updating profile', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  getProfileInfo(id: number) {
    return this.expertRepo.find(
      {

        where:{id:id},
        relations:{uprofile:true}
      })
  }
  
  async login(registrationDto:RegistrationDto)
{
  const expert = 
  await this.expertRepo.findOneBy({username:registrationDto.username});
  const result = 
  await bcrypt.compare(registrationDto.password, expert.password);
if(result)
{
  return true;
}
else{
  return false;
}

}

async getExpertStatusByUsername(username: string): Promise<any> {
  const expert = await this.expertRepo.findOneBy({ username });

  if (!expert) {
    throw new HttpException('Expert not found', HttpStatus.NOT_FOUND);
  }

  return {
    status: "Active",
    userId: expert.id,
  };
}

async deleteProfile(id: number): Promise<ExpertEntity> {
  const expert = await this.expertRepo.findOneBy({id});

  if (!expert) {
    throw new HttpException('Expert not found', HttpStatus.NOT_FOUND);
  }

  const deletedProfile = await this.expertRepo.remove(expert);
  return deletedProfile;
}


async getExpertById(expertId: number): Promise<ExpertEntity> {
  const expert = await this.expertRepo.findOneBy({ id: expertId });

  return expert;
}

async sendMessage(senderId: number, receiverId: number, content: string): Promise<Message> {
  const message = new Message();
  message.senderId = senderId;
  message.receiverId = receiverId;
  message.content = content;
  message.timestamp = new Date();
  return this.messageRepo.save(message);
}

async getMessages(senderId: number, receiverId: number): Promise<Message[]> {
  return this.messageRepo.find({
    where: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
    order: { timestamp: 'ASC' }, 
  });
}

async receivePayment(expertId: number, paymentDto: PaymentDto): Promise<any> {
  
  const receipt = `Payment of $${paymentDto.amount} received via ${paymentDto.paymentMethod}.`;

 
  const expert = await this.expertRepo.findOneBy({ id: expertId });
  if (!expert) {
    throw new NotFoundException(`Expert with ID ${expertId} not found`);
  }
  expert.balance += paymentDto.amount;
  expert.currency = paymentDto.currency;
  expert.paymentMethod = paymentDto.paymentMethod;

  await this.expertRepo.save(expert);

  return receipt;
}



async getExpertByUsername(username: string): Promise<ExpertEntity | null> {
  return this.expertRepo.findOne({ where: { username } });
}

async getAllSolutionsByExpertId(expertId: number): Promise<SolutionEntity[]> {
  return this.solutionRepo.find({
    where: { expert: { id: expertId } }
  });
}

async sendEmail(receiverEmail: string, subject: string, text: string): Promise<void> {
  try {
    await this.mailerService.sendMail({
      to: receiverEmail,
      subject,
      text,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    throw new NotFoundException('Failed to send email');
  }
}
  
}
