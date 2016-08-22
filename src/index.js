import {Validator as ValidatorInterface} from 'aurelia-validation';
import {Validator} from './validator';

export function configure(config) {
  debugger;
  config.container.registerInstance(ValidatorInterface, new Validator());
}
