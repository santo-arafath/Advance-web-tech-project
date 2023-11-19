import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UsePipes, UseInterceptors, ValidationPipe, Res, Delete, Session, NotFoundException, HttpStatus, ForbiddenException, UseGuards } from "@nestjs/common";
import { FarmerService } from "./farmer.service";
import { confirmOrderDTO, paymentInformationDTO } from "./payment.dto";
import { EditFarmerDTO, FarmerDTO, RequestDTO, userDTO, } from "./farmer.dto";
import { SessionGuard } from "./session.gaurd";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { editProductDTO, productDTO } from "./product.dto";
import { orderDTO } from "./order.dto";
import { ExpertDTO, VetDTO } from "./expert.dto";

@Controller('farmer')
export class FarmerController {
    constructor(private readonly farmerService: FarmerService) {}

    // Registration
    @Post('/registration')
    @UsePipes(new ValidationPipe)
    @UseInterceptors(FileInterceptor('profilePicture',
    { fileFilter(req, file, callback) {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
            callback(null, true);
        } else {
            callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false)
        }
    },
    limits: { fileSize: 1000000 },
    storage:diskStorage({
        destination: './profile_pictures',
        filename(req, file, callback) {
            callback(null, Date.now() + file.originalname)
        },
    })
    }))
    async registerFarmer(@Session() session, @Body() farmer:FarmerDTO, @UploadedFile() profilePicture: Express.Multer.File) {
        farmer.profilePicture = profilePicture.filename;
        if (farmer.password !== farmer.confirmPassword) {
            throw new ForbiddenException({
                status: HttpStatus.FORBIDDEN,
                message: "Password and confirm password does not match."
            });
        }
        const farmerDetails = await this.farmerService.registerFarmer(farmer);
        session.farmerID = farmerDetails.farmerID;
        session.email = farmerDetails.email;
        session.profilePicture = farmerDetails.profilePicture;
        return "Registration successful";
    }

    //Log in
    @Post('/login')
    async login(@Body() query:userDTO, @Session() session) {
       const farmerDetails = await this.farmerService.login(query);
       session.farmerID = farmerDetails.farmerID;
       session.email = farmerDetails.email;
       session.profilePicture = farmerDetails.profilePicture;
       return "Login successfull";
    }

    //Show Profile Details
    @Get('/showprofiledetails')
    @UseGuards(SessionGuard)
    showProfileDetails(@Session() session) {
        return this.farmerService.showProfileDetails(session.farmerID);
    }

    //Show Profile Picture
    @Get('/showprofilepicture')
    @UseGuards(SessionGuard)
    showProfilePicture(@Session() session, @Res() response) {
        const profilePicture = session.profilePicture;
        response.sendFile(profilePicture, { root: './profile_pictures' });
    }

    //Edit Profile Details
    @Put('/editprofiledetails')
    editProfileDetails(@Session() session, @Query() query:EditFarmerDTO) {
        return this.farmerService.editProfileDetails(session.farmerID, query);
    }



    //create expert profile
    @Post('/createExpert')
        @UsePipes(new ValidationPipe())
        createExpert(@Body() expertDTO: ExpertDTO) {
            return this.farmerService.createExpert(expertDTO);
        }

    //search expert 
    @Get('/searchExpertById/:id')
    getExpertById(@Param('id') id:number):any{
      return this.farmerService.getExpertById(id);
    }

    //view exper profile
    @Get('/viewExperProfile')
    async viewExpert() {
        return await this.farmerService.viewExpert();
    }

    //create vet profile
    @Post('/createVet')
        @UsePipes(new ValidationPipe())
        createVet(@Body() vetDTO: VetDTO) {
            return this.farmerService.createVet(vetDTO);
        }

    //search vet 
    @Get('/searchVetById/:id')
    getVetById(@Param('id') id:number):any{
      return this.farmerService.getVetById(id);
    }


    //view all vet profile
    @Get('/viewVetProfile')
    async viewVet() {
        return await this.farmerService.viewVet();
    }


    //create post to contact vet/expert
    @Post('/createpost')
        @UsePipes(new ValidationPipe())
        createPost(@Session() session, @Body() requestDTO: RequestDTO) {
            console.log(session.farmerID);
            return this.farmerService.createPost(session.farmerID, requestDTO);
    }


    //view all contact request
    @Get('/viewContactRequest')
    async viewRequest() {
        return await this.farmerService.viewRequest();
    }



    //Add Product
    @Post('/addproduct')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe)
    @UseInterceptors(FileInterceptor('picture',
    { fileFilter(req, file, callback) {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
            callback(null, true);
        } else {
            callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false)
        }
    },
    limits: { fileSize: 1000000 },
    storage:diskStorage({
        destination: './picture',
        filename(req, file, callback) {
            callback(null, Date.now() + file.originalname)
        },
    })
    }))
    async addProduct(@Body() product: productDTO, @UploadedFile() picture: Express.Multer.File) {
        product.picture = picture.filename;
        await this.farmerService.addProduct(product);
        return "Product Added";
    }

    // Shop
    @Get('/shop')
    @UseGuards(SessionGuard)
    async shop() {
        return await this.farmerService.shop();
    }

    // Add to Cart
    @Get('/addtocart')
    @UseGuards(SessionGuard)
    async addToCart(@Session() session, @Query() query:editProductDTO,@Body() order: orderDTO) {
        return await this.farmerService.addToCart(session.farmerID, query, order);
    }

    // Cart
    @Get('/cart')
    @UseGuards(SessionGuard)
    async cart(@Session() session) {
        return await this.farmerService.cart(session.farmerID);
    }

    // Search Order
    @Get('/searchorder/:orderID')
    @UseGuards(SessionGuard)
    async searchOrder(@Param('orderID') orderID:string) {
        return await this.farmerService.searchOrder(orderID);
    }

    // Delete Order
    @Delete('/cancelorder/:orderID')
    @UseGuards(SessionGuard)
    cancelOrder(@Param('orderID') orderID:string) {
        this.farmerService.cancelOrder(orderID);
        return "Delete Successful";
    }

    // Confirm Order
    @Post('/confirmorder')
    @UseGuards(SessionGuard)
    async confirmOrder(@Query() query: confirmOrderDTO, @Body() paymentInformation: paymentInformationDTO) {
        return await this.farmerService.confirmOrder(query, paymentInformation);
    }

    // Log Out
    @Get('/logout')
    @UseGuards(SessionGuard)
    async(@Session() session) {
        session.destroy();
        return "Loged Out";
    }


    @Get('/searchplantfertilizer/:plantName')
    @UseGuards(SessionGuard)
    searchPlantFertilizer(@Param('plantName') plantName:string, @Body() listOfPlantsAndTheirRequiredFertilizers:object): string {
        return this.farmerService.searchPlantFertilizer(plantName, listOfPlantsAndTheirRequiredFertilizers);
    }
    
    @Get('/notificationforwater')
    @UseGuards(SessionGuard)
    getNotificationForWater(): string {
        return this.farmerService.getNotificationForWater();
    }
    
}