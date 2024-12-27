export function validateModbusConfig(config) {
  if (!config.host || typeof config.host !== 'string') {
    throw new Error('Invalid Modbus host configuration');
  }
  if (!config.port || !Number.isInteger(config.port) || config.port < 1 || config.port > 65535) {
    throw new Error('Invalid Modbus port configuration');
  }
  return true;
}

export function validateOPCUAConfig(config) {
  if (!config.endpoint || typeof config.endpoint !== 'string') {
    throw new Error('Invalid OPC UA endpoint configuration');
  }
  if (!config.endpoint.startsWith('opc.tcp://')) {
    throw new Error('OPC UA endpoint must start with opc.tcp://');
  }
  return true;
}