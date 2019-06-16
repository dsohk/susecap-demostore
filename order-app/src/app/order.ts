export class Order {
    constructor(
        public customer: string,
        public product_id: number,
        public paymethod_id: number,
        public price: number,
        public timestamp: string
    ){ }
}
