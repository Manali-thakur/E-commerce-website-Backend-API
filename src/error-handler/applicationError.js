export class ApplicationError extends Error {
  constructor(message, code = 500, details = null) {
    super(message);
    // status code to its own instance property
    this.name = "ApplicationError";
    this.code = code;
    this.details = details; //added this so we can know more about the error
  }
}
