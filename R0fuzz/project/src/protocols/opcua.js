import { OPCUAClient } from 'node-opcua';
import { logger } from '../utils/logger.js';

export class OPCUAFuzzer {
  constructor(options = {}) {
    this.client = OPCUAClient.create({
      endpoint_must_exist: false,
      connectionStrategy: {
        initialDelay: 1000,
        maxRetry: 3
      }
    });
    this.options = {
      endpoint: options.endpoint || 'opc.tcp://127.0.0.1:4840',
      timeout: options.timeout || 5000
    };
  }

  async connect() {
    try {
      await this.client.connect(this.options.endpoint);
      logger.info(`Connected to OPC UA server at ${this.options.endpoint}`);
    } catch (error) {
      logger.error('OPC UA connection failed:', error);
      throw error;
    }
  }

  async fuzzNodes(nodeIds) {
    try {
      const session = await this.client.createSession();
      for (const nodeId of nodeIds) {
        const value = this.generateFuzzedValue();
        await session.write({
          nodeId,
          attributeId: 13, // Value
          value: { value: value }
        });
        logger.info(`Fuzzed node ${nodeId} with value ${value}`);
      }
      await session.close();
    } catch (error) {
      logger.error('OPC UA fuzzing failed:', error);
      throw error;
    }
  }

  generateFuzzedValue() {
    return Math.random() * 100;
  }
}