import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ModbusFuzzer } from './protocols/modbus.js';
import { OPCUAFuzzer } from './protocols/opcua.js';
import { logger } from './utils/logger.js';
import { validateModbusConfig, validateOPCUAConfig } from './utils/validator.js';

const argv = yargs(hideBin(process.argv))
  .option('protocol', {
    alias: 'p',
    description: 'Protocol to fuzz (modbus/opcua)',
    type: 'string',
    required: true
  })
  .option('host', {
    alias: 'h',
    description: 'Target host',
    type: 'string',
    default: '127.0.0.1'
  })
  .option('port', {
    alias: 'P',
    description: 'Target port',
    type: 'number',
    default: 502
  })
  .argv;

async function main() {
  try {
    switch (argv.protocol.toLowerCase()) {
      case 'modbus': {
        const config = { host: argv.host, port: argv.port };
        validateModbusConfig(config);
        
        const fuzzer = new ModbusFuzzer(config);
        await fuzzer.connect();
        await fuzzer.fuzzHoldingRegisters(0, 10);
        break;
      }
      
      case 'opcua': {
        const config = { endpoint: `opc.tcp://${argv.host}:${argv.port}` };
        validateOPCUAConfig(config);
        
        const fuzzer = new OPCUAFuzzer(config);
        await fuzzer.connect();
        await fuzzer.fuzzNodes(['ns=1;s=Temperature', 'ns=1;s=Pressure']);
        break;
      }
      
      default:
        throw new Error(`Unsupported protocol: ${argv.protocol}`);
    }
  } catch (error) {
    logger.error('Fuzzing failed:', error);
    process.exit(1);
  }
}

main();