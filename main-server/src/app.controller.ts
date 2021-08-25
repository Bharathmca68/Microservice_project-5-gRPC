import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
// import { MessagePattern } from '@nestjs/microservices'; <-- Change this
import { GrpcMethod } from '@nestjs/microservices'; //     <-- to this


interface INumberArray { //      <--
  data: number[]; //             <--   Add these
} //                             <--   two
interface ISumOfNumberArray { // <--   interfaces
  sum: number; //                <--
} //    

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(private readonly appService: AppService) { }

  // @MessagePattern('add')                     <--  Change this
  @GrpcMethod('AppController', 'Accumulate') // <--  to this
  //
  // async accumulate(data: number[])  {              <--  Change method param type
  //   this.logger.log('Adding ' + data.toString());  <--  and return type to match
  //   return this.appService.accumulate(data);      <--  .proto file
  // }                                                <--
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray { // <--
    this.logger.log('Adding ' + numberArray.data.toString()); //               <--  Should look
    return { sum: this.appService.accumulate(numberArray.data) }; //          <--  like this
  } //      


}
