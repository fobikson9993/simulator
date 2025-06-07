class GCodeBuffer {
  constructor() {
    this.code = [];
  }
  loadCode(code) {
    this.code = code.split('\n');
  }
  getCode() {
    return this.code;
  }
}

export default GCodeBuffer; 