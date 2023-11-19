import { HttpStatus, Injectable, NotFoundException, Session, UnauthorizedException } from "@nestjs/common";
import { EditFarmerDTO, FarmerDTO, RequestDTO, userDTO } from "./farmer.dto";
import { orderDTO } from "./order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FarmerEntity, RequestEntity } from "./farmer.entity";
import { ExpertEntity, VetEntity } from "./expert.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { promises } from "dns";
import { editProductDTO, productDTO } from "./product.dto";
import { ProductEntity } from "./product.entity";
import { OrderEntity } from "./order.entity";
import { confirmOrderDTO, paymentInformationDTO } from "./payment.dto";
import { ExpertDTO, VetDTO } from "./expert.dto";

@Injectable()
export class FarmerService{
    constructor(
        @InjectRepository(FarmerEntity)
        private farmerRepository: Repository<FarmerEntity>,
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>,
        @InjectRepository(ExpertEntity)
        private expertRepository: Repository<ExpertEntity>,
        @InjectRepository(VetEntity)
        private vetRepository: Repository<VetEntity>,
        @InjectRepository(RequestEntity)
        private requestRepository: Repository<RequestEntity>
    ) {}

    // Registration
    async registerFarmer(farmer: FarmerDTO): Promise<FarmerEntity> {
        const salt = await bcrypt.genSalt();
        farmer.password = await bcrypt.hash(farmer.password, salt);
        return await this.farmerRepository.save(farmer);
    }

    // Log in
    async login(query:userDTO)
    {
        const email = query.email;
        const password = query.password;
        const farmerDetails = await this.farmerRepository.findOneBy({ email : email });        
        if (farmerDetails === null) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: "farmer not found"
            })
        } else {
            if (await bcrypt.compare(password, farmerDetails.password)) {
                return farmerDetails;
            } else {
                throw new UnauthorizedException({
                    status: HttpStatus.UNAUTHORIZED,
                    message: "Password does not match"
                })
            }
        }
    }

    // Show Profile Details
    async showProfileDetails(farmerID) {
        return await this.farmerRepository.findOneBy({ farmerID : farmerID });
    }

    // Edit Profile Details
    async editProfileDetails(farmerID, query: EditFarmerDTO)
    {
        const profileDetails = await this.farmerRepository.findOneBy({ farmerID : farmerID });
        const editKey = query.editKey;
        const editValue = query.editValue;
        let validKey = false;
        for (let key in profileDetails) {
            if (key == editKey) {
                validKey = true;
            }
        }
        if (!validKey) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: "Property not found"
            })
        }
        profileDetails[editKey] = editValue;
        
        await this.farmerRepository.save(profileDetails);
        return ("Update Successful");
    }


    //**create expert
    async createExpert(expert: ExpertDTO): Promise<ExpertDTO> {
        return this.expertRepository.save(expert);
      }

    //view expert profile
    async getExpertById(id: number): Promise<ExpertDTO> {
        return this.expertRepository.findOneBy({id:id});
      }

    //all expert profile
    async viewExpert() {
        const expert = await this.expertRepository.find();
        let viewExpert = "";
        for (const key in expert) {
            viewExpert += (`
            --------------------------------------------------
            Expert ID: ${expert[key].id}
            Name: ${expert[key].name}
            Address: ${expert[key].address}
            Email: ${expert[key].email}
            --------------------------------------------------
            `);
        }
        return viewExpert;
    }
    

    //create vet
    async createVet(vet: VetDTO): Promise<VetDTO> {
        return this.vetRepository.save(vet);
      }

    //view vet profile
    async getVetById(id: number): Promise<VetDTO> {
        return this.vetRepository.findOneBy({id:id});
      }


    //all vet profile
    async viewVet() {
        const vet = await this.vetRepository.find();
        let viewVet = "";
        for (const key in vet) {
            viewVet += (`
            --------------------------------------------------
            Vet ID: ${vet[key].id}
            Name: ${vet[key].name}
            Address: ${vet[key].address}
            Email: ${vet[key].email}
            --------------------------------------------------
            `);
        }
        return viewVet;
    }


    //create post to contact vet/ expert
    async createPost(farmerID, request: RequestDTO): Promise<RequestEntity> {
        console.log(farmerID);
        const farmer = await this.farmerRepository.findOneBy(farmerID);
        request.farmerID = farmerID;
        console.log(request);
        return this.requestRepository.save(request);
      }

    
    //all contact request
    async viewRequest() {
        const request = await this.requestRepository.find();
        let viewRequest = "";
        for (const key in request) {
            viewRequest += (`
            --------------------------------------------------
            Request ID: ${request[key].requestID}
            Farmer ID: ${request[key].farmerID}
            Request Category: ${request[key].requestCategory}
            Request Status: ${request[key].requestStatus}
            --------------------------------------------------
            `);
        }
        return viewRequest;
    }  

    // Add Product
    async addProduct(product: productDTO): Promise<ProductEntity> {
        return this.productRepository.save(product);
    }

    // Shop
    async shop() {
        const products = await this.productRepository.find();
        let shop = "";
        for (const key in products) {
            shop += (`
            --------------------------------------------------
            Product ID: ${products[key].productID}
            Name: ${products[key].productName}
            Price: ${products[key].price}
            Description: ${products[key].description}
            Category: ${products[key].category}
            Tags: ${products[key].tags}
            Availability: ${products[key].availabilty}
            Rating: ${products[key].rating}
            Reviews: ${products[key].reviews}
            Supplier: ${products[key].supplier}
            --------------------------------------------------
            `);
        }
        return shop;
    }

    async addToCart(customerID, query: editProductDTO, order: orderDTO) {
        const editProduct = query.editProduct;
        const product = await this.productRepository.findOneBy({ productID: editProduct });
        const farmer = await this.farmerRepository.findOneBy(customerID);
        order.customerID = customerID;
        order.farmer = farmer;
        const now = new Date();
        const date = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();
        order.orderDate = `${date}/${month}/${year}`;
        order.orderStatus = "Pending";
        order.products = product.productName;
        order.totalAmount = product.price;
        order.shippingAddress = farmer.address;
        return this.orderRepository.save(order);
    }

    async cart(farmerID) {
        const orders = await this.orderRepository.find();
        let cart = "";
        for (const key in orders) {
            if (orders[key].customerID == farmerID) {
                cart += (`
            --------------------------------------------------
            Order ID: ${orders[key].orderID}
            Customer ID: ${orders[key].customerID}
            Order Date: ${orders[key].orderDate}
            Order Status: ${orders[key].orderStatus}
            Products: ${orders[key].products}
            Total Amount: ${orders[key].totalAmount}
            Shipping Address: ${orders[key].shippingAddress}
            --------------------------------------------------
            `);
            }
        }
        return cart;
    }

    async searchOrder(orderID) {
        const orders = await this.orderRepository.findOneBy( { orderID: orderID } );
                    return (`
                    --------------------------------------------------
                    Order ID: ${orders.orderID}
                    Customer ID: ${orders.customerID}
                    Order Date: ${orders.orderDate}
                    Order Status: ${orders.orderStatus}
                    Products: ${orders.products}
                    Total Amount: ${orders.totalAmount}
                    Shipping Address: ${orders.shippingAddress}
                    --------------------------------------------------
                    `);

    }


    async cancelOrder(orderID) {
        return await this.orderRepository.delete( { orderID: orderID } );
    }

    async confirmOrder(query: confirmOrderDTO, paymentInformation: paymentInformationDTO) {
        const orderID = query.orderID;
        const order = await this.orderRepository.findOneBy( { orderID: orderID } );
        order.orderStatus = "Shipped";
        await this.orderRepository.save(order);
        const now = new Date();
        const date = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();
        return (`
            Order ID: ${orderID}
            Amount: ${order.totalAmount}
            Currency: ${query.currency}
            Payment Method: ${query.paymentMethod}
            Payment Date: ${date}/${month}/${year}
        `)
    }

    searchPlantFertilizer(plantName: string, listOfPlantsAndTheirRequiredFertilizers: object) {
        for (const key in listOfPlantsAndTheirRequiredFertilizers) {
            if (key == plantName) {
                return (
               `Plant Name: ${key}
                Plant Name: ${listOfPlantsAndTheirRequiredFertilizers[key]} `
                );
            }
        }
    }
    getNotificationForWater(): string {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        if (hour == 9) {
            return (`
            Time: ${hour}:${minute}:${second}
            -------------------
            It's time to water your plants
            -------------------
            `)
        } else if (hour >= 12 && hour < 18) {
            return (`
            Time: ${hour}:${minute}:${second}
            --------------------
            It's time to water your plants
            --------------------
            `)
        } else {
            return (`
            Time: ${hour}:${minute}:${second}
            Break Time
            `)
        }
    }
}