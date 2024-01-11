const { response } = require("express");

const sendResponse = (statusCode, message, res) => {
  res.status(statusCode).send(message);
};

module.exports = sendResponse;