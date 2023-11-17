import { expect } from 'chai'
const debug = require('debug')('ajv-sandbox');

import disabledFleetSchema from "../configurations/validation_schemas/Disabled_Fleet.json";
import enbledFleetSchema from "../configurations/validation_schemas/Enabled_Fleet.json";
import ohadsSchema from "../configurations/validation_schemas/ohads.json";

const Ajv = require('ajv');

async function run() {
    debug('hi all');
    const ajv = new Ajv();  //schema validator

    ajv.addSchema(disabledFleetSchema, "disabledFleetSchema");
    ajv.addSchema(enbledFleetSchema, "enbledFleetSchema");
    ajv.addSchema(ohadsSchema, "ohadsSchema");

    let isValid = ajv.validate("enbledFleetSchema", {});
    debug(isValid);
    debug(ajv.errors);
    expect(isValid).to.equal(false);

    const enabler = {
        "enable_a" : false
    }

    isValid = ajv.validate("enbledFleetSchema", enabler);       //the schema expects enable_a:"false"
    debug(isValid);
    expect(isValid).to.equal(true);

    enabler.enable_a = true
    isValid = ajv.validate("enbledFleetSchema", enabler);
    debug(isValid);
    debug(ajv.errors);
    expect(isValid).to.equal(false);

    isValid = ajv.validate("disabledFleetSchema", enabler);       //another schema expects more (missing) params
    debug(isValid);
    debug(ajv.errors);
    expect(isValid).to.equal(false);

}



run();