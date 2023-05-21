import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shortly-API",
      version: "1.0.0",
      description: "API de Shortly, uma aplicação web inovadora que oferece um serviço de encurtamento de links eficiente e intuitivo.",
    },
  },

  apis: ["src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
//
