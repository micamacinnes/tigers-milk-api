// Uncomment these imports to begin using these cool features!

// import {inject} from @loopback/context;
import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { PaymentMethod } from "../models/payment-methods";
import { PaymentMethodsRepository } from "../repositories/payment-methods.repository";

export class PaymentMethodsController {
  constructor(@repository(PaymentMethod.name) private paymentRepo: PaymentMethodsRepository) { }

  @get('/payment-methods')
  async getPaymentMethod(): Promise<PaymentMethod[]> {
    return await this.paymentRepo.find();
  }

  @post('/payment-methods')
  async newPaymentMethod(@requestBody() payment_method: PaymentMethod) {
    return await this.paymentRepo.create(payment_method);
  }
}
