// Uncomment these imports to begin using these cool features!

// import {inject} from @loopback/context;
import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { Donations } from "../models/donations";
import { DonationsRepository } from "../repositories/donations.repository";

export class DonationsController {
  constructor(@repository(DonationsRepository.name) private donationsRepo: DonationsRepository) {}

  @get('/donation')
  async getAllDonation(): Promise<Array<Donations>> {
    return await this.donationsRepo.find();
  }

  @get('/donation/{user_id}')
  async DonationsPerUser(@param.path.number('user_id') userID: number): Promise<Donations[]> {
     return await this.donationsRepo.find({
       where: {
         user_id: userID
        }
      });
  }

  @post('/user/{user_id}/charity{charity_id}/donation')
  async newDonation(@param.path.number('user_id') user_id: number,
    @param.path.number('charity_id') charity_id: number,
    @requestBody() donation_amount: number){
      var donation = new Donations;
      donation.amount_donated = donation_amount;
      donation.user_id = user_id;
      donation.charity_id = charity_id;
      return await this.donationsRepo.create(donation);
  }

}
