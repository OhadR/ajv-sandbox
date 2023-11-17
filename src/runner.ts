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


}



run();