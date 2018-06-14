// Uncomment these imports to begin using these cool features!

// import {inject} from @loopback/context;
import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { PaymentMethod } from "../models/payment-methods";
import { PaymentMethodsRepository } from "../repositories/payment-methods.repository";

export class PaymentMethodsController {
  constructor(@repository(PaymentMethod.name) private paymentRepo: PaymentMethodsRepository) {}

  @get('payment-methods')
  async getPaymentMethod(): Promise<Array<PaymentMethod>>{
    return await this.paymentRepo.find();
  }

  @post('payment-methods')
  async newPaymentMethod(@requestBody() payment_method: PaymentMethod){
    if (!payment_method.user_id || !payment_method.card_number || 
      !payment_method.security_code || !payment_method.exp_date) {
      throw new HttpErrors.Unauthorized('missing data');
    }

    let paymentExists: boolean = !!(await this.paymentRepo.count({user_id: payment_method.user_id}));

    if(paymentExists){
      throw new HttpErrors.BadRequest('payment method already exists');
    }

    return await this.paymentRepo.create(payment_method);
  }

}
