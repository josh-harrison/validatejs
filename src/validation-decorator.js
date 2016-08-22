import {inject,NewInstance} from 'aurelia-dependency-injection';
import {ValidationController, validateTrigger, ValidationError} from 'aurelia-validation';
import {Validator} from './validator';

@inject(NewInstance.of(Validator))
export class ValidationDecorator extends ValidationController {
    
    constructor(validator:Validator){
        super(validator);
    }

    private validator: Validator;
    

    validate(obj?:any) : Array<any> {
        obj = obj || null;

        if(obj === null) 
            return this.validate();
        else 
            return this.validator.validateObject(obj);
    }

    setValidationTriger(trigger: any) {
        try {
            this.validateTrigger = trigger;
        }
        catch(err) {
            console.log(err.message);
        }
    }
}

