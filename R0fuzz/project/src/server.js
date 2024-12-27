import express from 'express';
import { logger } from './utils/logger.js';
import { ModbusFuzzer } from './protocols/modbus.js';
import { OPCUAFuzzer } from './protocols/opcua.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/fuzz', async (req, res) => {
  try {
    const { protocol, host, port: targetPort } = req.body;
    
    switch (protocol) {
      case 'modbus': {
        const fuzzer = new ModbusFuzzer({ host, port: targetPort });
        await fuzzer.connect();
        const results = await fuzzer.fuzzHoldingRegisters(0, 10);
        res.json({ success: true, results });
        break;
      }
      case 'opcua': {
        const fuzzer = new OPCUAFuzzer({ 
          endpoint: `opc.tcp://${host}:${targetPort}` 
        });
        await fuzzer.connect();
        const results = await fuzzer.fuzzNodes(['ns=1;s=Temperature']);
        res.json({ success: true, results });
        break;
      }
      default:
        res.status(400).json({ error: 'Unsupported protocol' });
    }
  } catch (error) {
    logger.error('Fuzzing request failed:', error);
    res.status(500).json({ error: error.message });
  }
});