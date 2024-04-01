const rateLimit = require('express-rate-limit')

// Middleware de limitation de débit
module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
  message:
    'Trop de requêtes effectuées depuis cette IP, veuillez réessayer plus tard'
})
