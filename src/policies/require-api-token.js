// src/policies/require-api-token.js
"use strict";

module.exports = async (policyContext, config, { strapi }) => {
  const authHeader = policyContext.request.header.authorization;

  // Pas de header = Bloqué
  if (!authHeader) {
    return false;
  }

  // Extraire le token
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  // Comparer avec le token de l'env
  const expectedToken = process.env.STRAPI_API_TOKEN;

  if (token === expectedToken) {
    return true; // ✅ Autorisé
  }

  return false; // ❌ Bloqué
};
