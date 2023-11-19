import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn( { name: 'product_id' } )
    productID: number;

    @Column( { name: 'product_name', type: 'varchar', length: 150 } )
    productName: string;

    @Column( { name: 'price', type: 'varchar', length: 150 } )
    price: string;

    @Column( { name: 'description', type: 'varchar', length: 150 } )
    description: string;

    @Column( { name: 'category', type: 'varchar', length: 150 } )
    category: string;

    @Column( { name: 'tags', type: 'varchar', length: 150 } )
    tags: string;

    @Column( { name: 'availabilty', type: 'varchar', length: 150 } )
    availabilty: string;

    @Column( { name: 'rating', type: 'varchar', length: 150 } )
    rating: string;

    @Column( { name: 'reviews', type: 'varchar', length: 1500 } )
    reviews: string;

    @Column( { name: 'supplier', type: 'varchar', length: 150 } )
    supplier: string;

    @Column( { name: 'picture', type: 'varchar', length: 150 } )
    picture: string;
}