export class Order {
    constructor(
        public id: number,
        public customer_name: string,
        public product_id: number,
        public paymethod_id: number,
        public price: number
    ){ }
}
