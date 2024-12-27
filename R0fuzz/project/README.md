# R0fuzz - ICS Protocol Fuzzer

A collaborative fuzzing tool for Industrial Control Systems (ICS) protocols.

## Supported Protocols

- Modbus
- OPC UA
- More coming soon (Profinet, DNP3, BACnet)

## Installation

```bash
npm install
```

## Usage

```bash
# Fuzz Modbus server
npm start -- --protocol modbus --host 192.168.1.100 --port 502

# Fuzz OPC UA server
npm start -- --protocol opcua --host 192.168.1.100 --port 4840
```

## Features

- Protocol-specific fuzzing strategies
- Configurable fuzzing parameters
- Detailed logging and reporting
- Input validation and safety checks

## Security Notice

This tool is for authorized security testing only. Never use on production ICS systems without proper authorization.