export class Order {
    constructor(
        public customer: string,
        public product: string,
        public paymethod: string,
        public price: number,
        public timestamp: string
    ){ }
}
