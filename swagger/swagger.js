// swagger/swagger.js
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Cargar archivo YAML
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

module.exports = {
  swaggerUi,
  swaggerDocument
};
