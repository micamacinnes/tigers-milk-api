// Uncomment these imports to begin using these cool features!

// import {inject} from @loopback/context;
import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { Donations } from "../models/donations";
import { DonationsRepository } from "../repositories/donations.repository";
import { UserRepository } from '../repositories/users.repository';
import { CharitiesRepository } from '../repositories/charities.repository';
import { User } from "../models/user";
import { Charity } from "../models/charity";

export class DonationsController {
  constructor(
    @repository(DonationsRepository.name) private donationsRepo: DonationsRepository,
    @repository(UserRepository.name) private userRepo: UserRepository,
    @repository(CharitiesRepository.name) private charityRepo: CharitiesRepository) { }

  @get('/donation')
  async getAllDonations(): Promise<Array<Donations>> {
    return await this.donationsRepo.find();
  }

  @get('/donation/{user_id}')
  async DonationsPerUserString(@param.path.number('user_id') user_id: number): Promise<Array<string>> {
    var id = new Array();
    var charities = new Array();
    var findDonations: Array<Donations> = [];
    var findDonations = await this.donationsRepo.find();
    

    for (var i = 1; i < findDonations.length + 1; i++) {
      var donation = await this.donationsRepo.findById(i);
      if (user_id == donation.user_id) {
        if (!id.includes(donation.charity_id)) {
          id.push(donation.charity_id);
          charities.push("Donated $" + donation.amount_donated + "to" + donation.charity_id);
        }
      }
    }
    return charities;
  }

  @get('/donation/{charity_id}')
  async DonationsPerCharity(@param.query.number('charity_id') charity_id: number): Promise<Array<Donations>> {
    var idArr = new Array();
    var donations: Array<Donations> = [];
    var findDonations: Array<Donations> = [];
    var findDonations = await this.donationsRepo.find();
    
    for (var i = 1; i < findDonations.length + 1; i++){
      var donation = await this.donationsRepo.findById(i);
      if (charity_id == donation.charity_id){
        if (!idArr.includes(donation.charity_id)) {
          idArr.push(donation.charity_id);
          donation.push(donation.charity_id);
        }
      }
    }
    return donations;
  }

  @post('/donation')
  async newDonation(@requestBody() donation: Donations) {
    let userExists: boolean = !!(await this.userRepo.count({donations_id: donation.user_id}));
    if (!userExists) {
      throw new HttpErrors.Unauthorized('User does not exist');
    }
    let charityExists: boolean = !!(await this.charityRepo.count({donations_id: donation.charity_id}));
    if (!charityExists) {
      throw new HttpErrors.Unauthorized('Charity does not exist');
    }

    if (donation.amount_donated <= 0) {
      throw new HttpErrors.Unauthorized('donation amount is 0');
    }
    return await this.donationsRepo.create(donation);
  }

  
  @get('donations/{user_id}/totalDonations')
  async donationTotalPerUser(@param.path.number('user_id') user_id: number): Promise<number> {
    var totalDonations = 0;
    var findDonations: Array<Donations> = [];
    var findDonations = await this.donationsRepo.find();

    for (var i = 1; i < findDonations.length + 1; i++){
      var donation = await this.donationsRepo.findById(i);
      if (user_id == donation.user_id) {
        totalDonations += donation.amount_donated;
      }
    }
    return totalDonations;
  }

  
}
