import { PaymentMethod } from "../models/payment-methods";
import { PaymentMethodsRepository } from "../repositories/payment-methods.repository";
export declare class PaymentMethodsController {
    private paymentRepo;
    constructor(paymentRepo: PaymentMethodsRepository);
    getPaymentMethod(): Promise<PaymentMethod[]>;
    newPaymentMethod(payment_method: PaymentMethod): Promise<PaymentMethod>;
}
