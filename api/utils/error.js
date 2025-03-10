// custom manul error information
export const errorHandler = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.message = message;
  return error
};
