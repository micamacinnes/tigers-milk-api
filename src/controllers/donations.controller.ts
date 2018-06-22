// Uncomment these imports to begin using these cool features!

// import {inject} from @loopback/context;
import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param, createControllerFactoryForClass } from "@loopback/rest";
import { Donations } from "../models/donations";
import { DonationsRepository } from "../repositories/donations.repository";
import { UserRepository } from '../repositories/users.repository';
import { CharitiesRepository } from '../repositories/charities.repository';
import { User } from "../models/user";
import { Charity } from "../models/charity";
import { stripeToken} from '../models/stripeToken';
import { verify } from "jsonwebtoken";

export class DonationsController {
  constructor(
    @repository(DonationsRepository.name) private donationsRepo: DonationsRepository,
    @repository(UserRepository.name) private userRepo: UserRepository,
    @repository(CharitiesRepository.name) private charityRepo: CharitiesRepository) { }

  @get('/donation')
  async getAllDonations(): Promise<Array<Donations>> {
    return await this.donationsRepo.find();
  }

  @get('/donations')
  async getDonationsByUserId(@param.query.string('jwt') jwt: string) {

      if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');

      try {
        var jwtBody = verify(jwt, 'shh') as any;
        console.log(jwtBody);

        //Find all the donations associated with the user id
        var userDonations = await this.donationsRepo.find({where: {userID: jwtBody.user.id}});

        // // var charities = await this.donationsRepo.find({where: {charityID: jwtBody.charity.id}});
        // var charitiesInDonations = await this.donationsRepo.find({where:{
        //   userID:jwtBody.user.id,
        //   charityID: jwtBody.charity.id
        // }})


        //Convert the charityId for each donation into a charity name and logo
        // var allCharities = await this.charityRepo.find();
        // var charityIdToName: { [key: number]: string } = {};
        // var charityIdToImg: { [key: number]: string } = {};

        // for (var i = 0; i < charities.length; ++i) {
        //   // let charity = allCharities[i];
          
        //   // charityIdToName[charity.id as number] = charity.name;
        //   // charityIdToImg[charity.id as number] = charity.img;
        // }

        //Create object with userDonation properties and charity name and logo properties
        // var userDonationProperties: Array<object> = [];

        // for (var i = 0; i < userDonations.length; ++i) {
        //   let { amount, date, charityID} = userDonations[i];
        //   userDonationProperties.push({
        //     amount,
        //     date,
        //     // charityName: charityIdToName[charityID as number],
        //     // charityLogo: charityIdToImg[charityId as number],
        //   });
        // }

        return userDonations;

      } 
      
      catch (err) {
        console.log(err);
        throw new HttpErrors.BadRequest('JWT token invalid');
      }

  }

  //create a donation with userId and charityId
  @post('/createDonation') 
  async createDonation(
    @requestBody() newDonation: Donations,
    @param.query.string('jwt') jwt: string,
    @param.query.number('charityID') charityID: number,
    ): Promise<any>{

    if (!jwt) {
      throw new HttpErrors.Unauthorized('JWT token is required.');
    }
    try {
      var jwtBody = verify(jwt, 'shh') as any;
      console.log(jwtBody);
      
      newDonation.userID= jwtBody.user.id;
      newDonation.charityID = charityID;
      console.log(jwtBody);
      console.log(charityID);
      var donation = this.donationsRepo.create(newDonation);
      return donation;

    }

    catch (err) {
      console.log(err);
      throw new HttpErrors.BadRequest('JWT token invalid');
    }

  }


  // @get('donations/{user_id}/totalDonations')
  // async donationTotalPerUser(@param.path.number('user_id') user_id: number): Promise<number> {
  //   var totalDonations = 0;
  //   var findDonations: Array<Donations> = [];
  //   var findDonations = await this.donationsRepo.find();

  //   for (var i = 1; i < findDonations.length + 1; i++) {
  //     var donation = await this.donationsRepo.findById(i);
  //     if (user_id == donation.user_id) {
  //       totalDonations += donation.amount_donated;
  //     }
  //   }
  //   return totalDonations;
  // }

}
