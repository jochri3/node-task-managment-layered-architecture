const { Prisma } = require('@prisma/client')

// Ici, il y aura des logs internes et ce qu'on envoie aux utilisateurs finaux
const prismaErrorHandler = (err, req, res, next) => {
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      error: 'Bad Request',
      details: err.message
    })
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2000':
        // The provided value for the column is too long
        res.status(400).json({
          error: 'Bad request',
          details: `Value too long for field "${err.meta.target}"`
        })
        break
      case 'P2001':
        // The record searched for in the where condition does not exist
        res.status(404).json({
          error: 'Not found',
          details: `Record not found for "${err.meta.cause}"`
        })
        break
      case 'P2002':
        // Unique constraint violation
        res.status(409).json({
          error: 'Conflict',
          details: `Unique constraint violation for field "${err.meta.target}"`
        })
        break
      case 'P2003':
        // Foreign key constraint violation
        res.status(409).json({
          error: 'Conflict',
          details: `Foreign key constraint violation for field "${err.meta.field_name}"`
        })
        break
      case 'P2004':
        // A constraint failed on the database
        res.status(400).json({
          error: 'Bad request',
          details: `Constraint failed for field "${err.meta.target}"`
        })
        break
      case 'P2005':
        // The value stored in the database for the field is invalid
        res.status(400).json({
          error: 'Bad request',
          details: `Invalid value for field "${err.meta.field_name}"`
        })
        break
      case 'P2006':
        // The provided value for the field is not valid
        res.status(400).json({
          error: 'Bad request',
          details: `Invalid value for field "${err.meta.field_name}"`
        })
        break
      case 'P2007':
        // Data validation error
        res.status(400).json({
          error: 'Bad request',
          details: `Data validation failed for field "${err.meta.field_name}"`
        })
        break
      case 'P2008':
        // Failed to parse the query
        res.status(400).json({
          error: 'Bad request',
          details: 'Failed to parse the query'
        })
        break
      case 'P2009':
        // Failed to validate the query
        res.status(400).json({
          error: 'Bad request',
          details: 'Failed to validate the query'
        })
        break
      case 'P2010':
        // Raw query failed
        res.status(400).json({
          error: 'Bad request',
          details: 'Raw query failed'
        })
        break
      case 'P2011':
        // Null constraint violation
        res.status(400).json({
          error: 'Bad request',
          details: `Null constraint violation for field "${err.meta.field_name}"`
        })
        break
      case 'P2012':
        // Missing a required value
        res.status(400).json({
          error: 'Bad request',
          details: `Missing required field "${err.meta.field_name}"`
        })
        break
      case 'P2013':
        // Missing the required argument
        res.status(400).json({
          error: 'Bad request',
          details: `Missing required argument "${err.meta.argument_name}"`
        })
        break
      case 'P2014':
        // The change you are trying to make would violate the required relation
        res.status(409).json({
          error: 'Conflict',
          details: `The change would violate the required relation "${err.meta.relation_name}"`
        })
        break
      case 'P2015':
        // A related record could not be found
        res.status(404).json({
          error: 'Not found',
          details: `Related record not found for "${err.meta.relation_name}"`
        })
        break
      case 'P2016':
        // Query interpretation error
        res.status(400).json({
          error: 'Bad request',
          details: 'Query interpretation error'
        })
        break
      case 'P2017':
        // The records for relation between the parent and child models are not connected
        res.status(400).json({
          error: 'Bad request',
          details: `The records for relation "${err.meta.relation_name}" are not connected`
        })
        break
      case 'P2018':
        // The required connected records were not found
        res.status(404).json({
          error: 'Not found',
          details: `The required connected records for relation "${err.meta.relation_name}" were not found`
        })
        break
      case 'P2019':
        // Input error
        res.status(400).json({
          error: 'Bad request',
          details: `Invalid input for field "${err.meta.field_name}"`
        })
        break
      case 'P2020':
        // Value out of range for the type
        res.status(400).json({
          error: 'Bad request',
          details: `Value out of range for field "${err.meta.field_name}"`
        })
        break
      case 'P2021':
        // The table does not exist in the current database
        res.status(404).json({
          error: 'Not found',
          details: `Table "${err.meta.table}" does not exist in the database`
        })
        break
      case 'P2022':
        // The column does not exist in the current database
        res.status(404).json({
          error: 'Not found',
          details: `Column "${err.meta.column}" does not exist in the database`
        })
        break
      case 'P2023':
        // Inconsistent column data
        res.status(500).json({
          error: 'Internal server error',
          details: 'Inconsistent column data'
        })
        break
      case 'P2024':
        // Timed out fetching a new connection from the pool
        res.status(500).json({
          error: 'Internal server error',
          details: 'Timed out fetching a new connection from the pool'
        })
        break
      case 'P2025':
        // An operation failed because it depends on one or more records that were required but not found
        res.status(404).json({
          error: 'Not found',
          details:
            'An operation failed because it depends on one or more records that were required but not found'
        })
        break
      case 'P2026':
        // The current database provider doesn't support a feature that the query used
        res.status(400).json({
          error: 'Bad request',
          details:
            "The current database provider doesn't support a feature that the query used"
        })
        break
      case 'P2027':
        // Multiple errors occurred on the database during query execution
        res.status(500).json({
          error: 'Internal server error',
          details:
            'Multiple errors occurred on the database during query execution'
        })
        break
      default:
        // Other Prisma errors
        res
          .status(500)
          .json({ error: 'Internal server error', details: err.message })
        break
    }
  } else {
    // Pass the error to the next error handling middleware
    next(err)
  }
}

module.exports = prismaErrorHandler
