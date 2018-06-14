import { PaymentMethod } from "../models/payment-methods";
import { PaymentMethodsRepository } from "../repositories/payment-methods.repository";
export declare class PaymentMethodsController {
    private paymentRepo;
    constructor(paymentRepo: PaymentMethodsRepository);
    getPaymentMethod(): Promise<Array<PaymentMethod>>;
    newPaymentMethod(payment_method: PaymentMethod): Promise<PaymentMethod>;
}
