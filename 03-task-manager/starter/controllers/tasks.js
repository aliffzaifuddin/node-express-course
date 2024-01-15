const Task = require('../models/Task')
const asyncWapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWapper(async (req,res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

const createTask = asyncWapper(async (req,res) => {
  const task = await Task.create(req.body)
  res.status(201).json({task})
})

const getTask = asyncWapper(async (req,res,next) => {
  const {id: taskID} = req.params
  const task = await Task.findOne({ _id:taskID})
  if(!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

const deleteTask = asyncWapper(async (req,res,next) => {
  const {id: taskID} = req.params
  const task = await Task.findOneAndDelete({ _id:taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

const updateTask = asyncWapper(async (req,res,next) => {
  const {id:taskID} = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID} , req.body, {
    new: true, 
    runValidators: true,
  })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({task})
})

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask
}