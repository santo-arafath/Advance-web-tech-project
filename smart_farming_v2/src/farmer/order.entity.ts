import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FarmerEntity } from "./farmer.entity";

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn( { name: 'order_id' } )
    orderID: number;

    @Column( { name: 'customer_id' } )
    customerID: number;

    @Column( { name: 'order_date', type: 'varchar', length: 255 } )
    orderDate: string;

    @Column( { name: 'order_status', type: 'varchar', length: 255 } )
    orderStatus: string;

    @Column( { name: 'products', type: 'varchar', length: 255 } )
    products: string;

    @Column( { name: 'total_amount', type: 'varchar', length: 255 } )
    totalAmount: string;

    @Column( { name: 'shipping_address', type: 'varchar', length: 255 } )
    shippingAddress: string;

    @ManyToOne(() => FarmerEntity, farmer => farmer.orders)
    farmer: FarmerEntity;
}