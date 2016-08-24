import {metadata} from 'aurelia-metadata';
import {ValidationError} from 'aurelia-validation';
import {metadataKey} from './metadata-key';
import validate from 'validate.js';
import moment from 'moment';

export class Validator {
  constructor() {
    validate.extend(validate.validators.datetime, {
      parse: function(value, options) {
        return +moment.utc(value);
      },
      format: function(value, options) {
        var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
        return moment.utc(value).format(format);
      }
    });
  }
  _validate(object, propertyName = null, rules = null) {
    const errors = [];
    if (!rules) {
      rules = metadata.get(metadataKey, object);
    }
    if (!rules) {
      // no rules defined for propertyName.
      return errors;
    }
    rules = rules.rules;
    for (let i = 0, ii = rules.length; i < ii; i++) {
      const ruleInfo = rules[i];
      if (propertyName !== null && ruleInfo.key !== propertyName) {
        continue;
      }
      const { name, config } = ruleInfo.rule;
      const validator = { [propertyName]: { [name]: config } };
      const result = validate(object, validator);
      if (result) {
        errors.push(new ValidationError(ruleInfo.rule, result[propertyName][0], object, propertyName));
      }
    }
    return errors;
  }

  validateProperty(object, propertyName, rules = null) {
    return this._validate(object, propertyName, rules);
  }

  validateObject(object, rules = null) {
    return this._validateComplex(object, rules);
  }

  _validateComplex(object, validator) {
    const errors = [];
    const result = validate(object, validator);
    if (result) {
        errors.push(new ValidationError(null, result[object.propertyName][0], object));
    }
    return errors;
  }
}
