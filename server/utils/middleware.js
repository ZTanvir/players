const logger = require("../utils/logger");

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandlerFunction = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error });
  }
};

module.exports = { unknownEndPoint, errorHandlerFunction };
