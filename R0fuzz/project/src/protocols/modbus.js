import ModbusRTU from 'modbus-serial';
import { logger } from '../utils/logger.js';

export class ModbusFuzzer {
  constructor(options = {}) {
    this.client = new ModbusRTU();
    this.options = {
      host: options.host || '127.0.0.1',
      port: options.port || 502,
      timeout: options.timeout || 1000
    };
  }

  async connect() {
    try {
      await this.client.connectTCP(this.options.host, { port: this.options.port });
      logger.info(`Connected to Modbus server at ${this.options.host}:${this.options.port}`);
    } catch (error) {
      logger.error('Modbus connection failed:', error);
      throw error;
    }
  }

  async fuzzHoldingRegisters(startAddress, quantity) {
    try {
      const values = this.generateFuzzedValues(quantity);
      await this.client.writeRegisters(startAddress, values);
      logger.info(`Fuzzed ${quantity} holding registers starting at ${startAddress}`);
    } catch (error) {
      logger.error('Modbus fuzzing failed:', error);
      throw error;
    }
  }

  generateFuzzedValues(quantity) {
    return Array(quantity).fill().map(() => Math.floor(Math.random() * 65536));
  }
}