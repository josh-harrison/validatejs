import {Validator as ValidatorInterface} from './validation-decorator';
import {Validator} from './validator';

export function configure(config) {
  debugger;
  config.container.registerInstance(ValidatorInterface, new Validator());
}
