import { Body, Controller, Logger, Post } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IGrpcService } from './grpc.interface';
import { microserviceOptions } from './grpc.options';

@Controller()
export class AppController {
    private logger = new Logger('AppController');

    @Client(microserviceOptions) // <-- Add
    private client: ClientGrpc;  // <-- this

    private grpcService: IGrpcService;

    // constructor(private mathService: MathService) {} // <-- Remove this

    onModuleInit() {                                                            // <--
        this.grpcService = this.client.getService<IGrpcService>('AppController'); // <-- Add this
    }                                                                           // <--

    @Post('add')
    async accumulate(@Body('data') data: number[]) {
        this.logger.log('Adding ' + data.toString());
        // return this.mathService.accumulate(data);  // <-- Change this
        return this.grpcService.accumulate({ data }); // <-- to this
    }
}

