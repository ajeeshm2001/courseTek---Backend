const { userRegistration, userLogin } = require('../Controller/userController/userAuthController');
const { courseAvailability, courseBooking } = require('../Controller/userController/userCourseController');

const router = require('express').Router()

//User Registration
router.post('/register',userRegistration)

//User Login
router.post('/login',userLogin)

//User Course Availability
router.post('/courseavailability/:id',courseAvailability)

//User Course Booking
router.put('/coursebooking/:userid/:id',courseBooking)

module.exports=router;