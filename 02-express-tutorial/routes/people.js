const express = require('express')
const router = express.Router()

const {
	getPeople,
	createPerson,
	createPersonPostman,
	updatePerson,
	deletePerson
} = require('../controllers/people.js')


// router.get('/', getPeople)
// router.post('/', createPerson)
// router.post('/postman', createPersonPostman) 
// router.put('/:id', updatePerson)
// router.delete('/:id', deletePerson)

// Another method that can be used with exact functionality
router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson).delete(deletePerson)


module.exports = router;