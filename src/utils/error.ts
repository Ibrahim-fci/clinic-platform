class ApiError extends Error {
  statusCode: number;
  status: string;
  msg: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.msg = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  }
}

export default ApiError;
