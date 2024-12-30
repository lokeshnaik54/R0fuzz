# R0fuzz - ICS Protocol Fuzzer

A collaborative fuzzing tool for Industrial Control Systems (ICS) protocols.

## Supported Protocols
- Modbus
- OPC UA
- More coming soon (Profinet, DNP3, BACnet)

## Installation

### Prerequisites

Ensure you have the following installed on your system:

1. **Node.js** (version 14 or higher) and **npm**: Download and install from the [Node.js official website](https://nodejs.org/).
2. **Git** (optional): Useful for cloning the repository.

### Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/R0fuzz.git
   cd R0fuzz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   This command will install all required packages as listed in the `package.json` file.

3. Verify the installation:
   ```bash
   npm run check
   ```
   This command will run preliminary checks to ensure all dependencies are installed correctly.

4. Optional: Build the project (if applicable):
   ```bash
   npm run build
   ```

## Usage

Start fuzzing by using the following commands:

### Fuzz Modbus Server
```bash
npm start -- --protocol modbus --host 192.168.1.100 --port 502
```

### Fuzz OPC UA Server
```bash
npm start -- --protocol opcua --host 192.168.1.100 --port 4840
```

### Configurable Parameters
You can customize the fuzzing process by providing additional parameters:
- `--iterations <number>`: Specify the number of fuzzing iterations.
- `--timeout <milliseconds>`: Set a timeout for each fuzzing request.

Example:
```bash
npm start -- --protocol modbus --host 192.168.1.100 --port 502 --iterations 1000 --timeout 500
```

## Features

- **Protocol-specific fuzzing strategies**
- **Configurable fuzzing parameters**
- **Detailed logging and reporting**
- **Input validation and safety checks**

## Security Notice
This tool is for authorized security testing only. Never use on production ICS systems without proper authorization.

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License.
