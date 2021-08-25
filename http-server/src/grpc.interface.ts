import { Observable } from 'rxjs';

export interface IGrpcService {
    accumulate(numberArray: INumberArray): Observable<any>; // instead if services this file is used 
}

interface INumberArray {
    data: number[];
}
