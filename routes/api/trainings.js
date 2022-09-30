const express = require('express')
const { ctrlWrapper } = require('../../helpers')
const {
  getActiveTrainings,
  updateTrainigStatus,
} = require('../../controllers/trainings')
const {
  authenticateUser,
  validateRequestId,
  validateBody,
} = require('../../middlewares')
const { updateTrainingStatusSchema } = require('../../models')

const router = express.Router()

router.get('/', authenticateUser, ctrlWrapper(getActiveTrainings))

router.patch(
  '/:id/status',
  authenticateUser,
  validateRequestId,
  validateBody(updateTrainingStatusSchema),
  ctrlWrapper(updateTrainigStatus)
)

module.exports = router
