const { adminApprovalList, userApproval, userDisapproval } = require('../Controller/adminController/adminApprovalController');
const { adminLogin } = require('../Controller/adminController/adminAuthController');
const { addCourse, editCourse, deleteCourse, courseSchedule, getCourse, getOneCourse, scheduledClasses } = require('../Controller/adminController/adminCourseController');
const router = require('express').Router()

// Admin Login
router.post('/adminlogin',adminLogin)

//Admin Add Course
router.post('/addcourse',addCourse)

//Admin Get Course
router.get('/getcourse',getCourse)

//Admin GetOne Course
router.get('/getonecourse/:id',getOneCourse)

//Admin Edit Course
router.put('/editcourse/:id',editCourse)

//Admin Delete Course
router.delete('/deletecourse/:id',deleteCourse)

//Admin User Approval List
router.get('/approvallist',adminApprovalList)

//Admin User Approval 
router.patch('/approval/:id',userApproval)

//Admin User Disapproval
router.delete('/disapproval/:id',userDisapproval)

//Admin Course Schedule
router.post('/schedule/:id',courseSchedule)

//Admin Scheduled Classes
router.get('/scheduled',scheduledClasses)

//Admin Date Scheduled Classes
router.post('/dateclass',)


module.exports=router;