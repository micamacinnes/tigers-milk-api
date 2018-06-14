// Uncomment these imports to begin using these cool features!

// import {inject} from @loopback/context;
import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { Donations } from "../models/donations";
import { DonationsRepository } from "../repositories/donations.repository";

export class DonationsController {
  constructor(@repository(DonationsRepository.name) private donationsRepo: DonationsRepository) {}

  @post('/donations')
  async newDonation(@requestBody() donation: Donations){
    if (!donation.charity_id || !donation.user_id || !donation.amount_donated){
      throw new HttpErrors.BadRequest('missing data');
    }

    return await this.donationsRepo.create(donation);

  }

}
