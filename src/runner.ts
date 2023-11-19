import { expect } from 'chai'
const debug = require('debug')('ajv-sandbox');

import disabledFleetSchema from "../configurations/validation_schemas/Disabled_Fleet.json";
import enbledFleetSchema from "../configurations/validation_schemas/Enabled_Fleet.json";
import ohadsSchema from "../configurations/validation_schemas/ohads.json";
import nestedSchema from "../configurations/validation_schemas/nested.json";

const Ajv = require('ajv');

async function run() {
    debug('hi all');
    const ajv = new Ajv();  //schema validator

    ajv.addSchema(disabledFleetSchema, "disabledFleetSchema");
    ajv.addSchema(enbledFleetSchema, "enbledFleetSchema");
    ajv.addSchema(ohadsSchema, "ohadsSchema");
    ajv.addSchema(nestedSchema, "nestedSchema");

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

    const ohads = {
        keepAlways : false,     // keepAlways can be any boolean
        fleeName: 'moshe'
    }

    isValid = ajv.validate("ohadsSchema", ohads);
    debug(isValid);
    debug(ajv.errors);
    expect(isValid).to.equal(false);    //fleetName can be ['A__ohads_transportation_Ltd']

    ohads.fleeName = 'A__ohads_transportation_Ltd';
    isValid = ajv.validate("ohadsSchema", ohads);
    debug(isValid);
    expect(isValid).to.equal(true);    //fleetName is fine

    /******** nested ********/
    debug('checking object with nested objects...');
    const complex = {
        keepAlways : false,     // keepAlways can be any boolean
        nested: {
            foo: 'moshe',
            bar: 'bar'
        }
    }
    isValid = ajv.validate("nestedSchema", complex);
    debug(isValid);
    debug(ajv.errors);
    expect(isValid).to.equal(true);
}



run();