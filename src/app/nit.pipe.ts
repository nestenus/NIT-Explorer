import { Pipe, PipeTransform } from '@angular/core';
import { HelperService } from './service/helper/helper.service';
import  Units from '../../node_modules/ethereumjs-units';
// var BigNumber = require('bignumber.js')

// var Units = {}

// var rawUnits = require('./units.json')
// var units = {}
// // import { from } from 'rxjs';

@Pipe({
    name: 'convertnit'
})
export class NitPipe implements PipeTransform {
    constructor(public helper: HelperService) { }

    transform(value: any, args?: any): any {
        // let helper = HelperService;
        
        if(!value){
            value = 0;
        }
        value = value.toString()
       return Units.convert(value,  'wei', 'eth');
        return value / 1000000000000000000;
    }
   
}