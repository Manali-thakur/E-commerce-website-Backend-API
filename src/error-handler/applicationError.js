export class ApplicationError extends Error {
  constructor(message, code) {
    super(message);
    // status code to its own instance property
    this.code = code;
  }
}
