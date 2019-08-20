const express = require('express');
const userController = require("../controllers/userController");
const appConfig = require("../../config/appConfig")

 let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;
    
    app.post(`${baseUrl}/signup`, userController.signupFunction);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/signup api for sign up.
     *
     * @apiParam {string} firstName First Name of the user. (body params) (required)
     * @apiParam {string} lastname Last Name of the user. (body params) (required)
     * @apiParam {number} mobile Mobile Number of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} country country Name of the user. (body params) (required)
     * @apiParam {boolean} isAdmin true-if user is admin and false-if user is not admin. (body params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Congrats! user created succesfully!",
                "status": 200,
                "data": {
                    "userId": "KFJ8suFYL",
                    "firstName": "Emma",
                    "lastName": "Watson",
                    "email": "emmawatson@gmail.com",
                    "country": "England",
                    "mobile": 7240277241,
                    "createdOn": "2019-08-18T19:04:58.000Z",
                    "isAdmin": false
                }
            }
    */

    app.post(`${baseUrl}/login`, userController.loginFunction);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/login api for sign in.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Welcome Back! Login succesful!",
                "status": 200,
                "data": {
                    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImdOb1RZWVhzViIsImlhdCI6MTU2NjE1NTc2MzkxOSwiZXhwIjoxNTY2MjQyMTYzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IktGSjhzdUZZTCIsImZpcnN0TmFtZSI6IkVtbWEiLCJsYXN0TmFtZSI6IldhdHNvbiIsImVtYWlsIjoiZW1tYXdhdHNvbkBnbWFpbC5jb20iLCJjb3VudHJ5IjoiRW5nbGFuZCIsIm1vYmlsZSI6NzI0MDI3NzI0MSwiaXNBZG1pbiI6ZmFsc2V9fQ.qg2OZJ1Y6VA-dRUgZjl47-CrRV7C0JTcDyOONRooDaw",
                    "userDetails": {
                        "userId": "KFJ8suFYL",
                        "firstName": "Emma",
                        "lastName": "Watson",
                        "email": "emmawatson@gmail.com",
                        "country": "England",
                        "mobile": 7240277241,
                        "isAdmin": false
                    }
                }
            }
    */

    app.get(`${baseUrl}/users/all`, userController.getAllUsers);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/all api to get all users(admin+normal).
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "User details found!",
                "status": 200,
                "data": [
                    {
                        "userId": "gY9PxM0oA",
                        "firstName": "vaibhav",
                        "lastName": "udaywal",
                        "email": "vaibhav@gmail.com",
                        "country": "IN",
                        "mobile": 7845122356,
                        "password": "$2a$10$Yi6zTYeCJyvjjlaVcG1Xguc0fbFjDVwIAMDMusUvpihSo8RBIwsQi",
                        "createdOn": "2019-08-12T15:23:45.000Z",
                        "_id": "5d51848105a8a524cc24a5f7",
                        "isAdmin": true,
                        "__v": 0
                    },
                    {
                        "userId": "Z5QqGoGOB",
                        "firstName": "leo",
                        "lastName": "messi",
                        "email": "messi@gmail.com",
                        "country": "IN",
                        "mobile": 7845125689,
                        "password": "$2a$10$4BjXWD5qyv8iD.56dtPc7eDKr.Mnre4Qv8H3pfcaWXntpSg0G4jAK",
                        "createdOn": "2019-08-12T16:17:07.000Z",
                        "_id": "5d519103466fcb17ec773686",
                        "isAdmin": false,
                        "__v": 0
                    }
                ]
            }
    */

    app.post(`${baseUrl}/logout`, userController.logout)
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/logout api to sign out active user.
     *
     * @apiParam {string} activeUserId loggedin userId of the the user. (body params) (required)
     * 
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "logout successful!",
                "status": 200,
                "data": [
                    {
                        "tokenGenerationTime": "2019-08-18T19:16:03.000Z",
                        "_id": "5d59a3f3d182a603d8ed02fd",
                        "userId": "KFJ8suFYL",
                        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImdOb1RZWVhzViIsImlhdCI6MTU2NjE1NTc2MzkxOSwiZXhwIjoxNTY2MjQyMTYzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IktGSjhzdUZZTCIsImZpcnN0TmFtZSI6IkVtbWEiLCJsYXN0TmFtZSI6IldhdHNvbiIsImVtYWlsIjoiZW1tYXdhdHNvbkBnbWFpbC5jb20iLCJjb3VudHJ5IjoiRW5nbGFuZCIsIm1vYmlsZSI6NzI0MDI3NzI0MSwiaXNBZG1pbiI6ZmFsc2V9fQ.qg2OZJ1Y6VA-dRUgZjl47-CrRV7C0JTcDyOONRooDaw",
                        "tokenSecret": "someVeryRandomStringThatNobodyCanGuessLiterallyNobodyCanGuess",
                        "__v": 0
                    }
                ]
            }
    */
    
    app.post(`${baseUrl}/forgotpassword`, userController.forgotPassword)
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/forgotpassword api to get password link in email.
     *
     * @apiParam {string} email user email. (body params) (required)
     * 
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Password reset link sent Successfully",
                "status": 200,
                "data": null
            }
    */

    app.post(`${baseUrl}/resetPassword`, userController.resetPassword)
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/resetPassword api to set new password.
     *
     * @apiParam {string} userId user's Id. (body params) (required)
     * @apiParam {string} password new password. (body params) (required)
     * 
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Password changed Successfully",
                "status": 200,
                "data": null
            }
    */

    app.post(`${baseUrl}/meeting/create`, userController.createMeeting);
    /**
     * @apiGroup meeting
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/create api for creating a new meeting.
     *
     * @apiParam {string} meetingName meeting name. (body params) (required)
     * @apiParam {string} inviterId admin's id. (body params) (required)
     * @apiParam {string} inviterName admin's name. (body params) (required)
     * @apiParam {string} inviterEmail admin's email. (body params) (required)
     * @apiParam {string} inviteeId invitee's id. (body params) (required)
     * @apiParam {string} inviteeName invitee's name. (body params) (required)
     * @apiParam {string} inviteeEmail invitee's email. (body params) (required)
     * @apiParam {date} meetingStartTime meeting start time. (body params) (required)
     * @apiParam {date} meetingEndTime meeting end time. (body params) (required)
     * @apiParam {string} meetingVenue meeting venue. (body params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "meeting scheduled successfully!",
                "status": 200,
                "data": {
                    "meetingId": "mL6RBcnJc",
                    "meetingName": "Test Meeting",
                    "inviterId": "aSHsm7h9n",
                    "inviterName": "Albus Dumbledore",
                    "inviterEmail": "dumbledore@gmail.com",
                    "inviteeId": "",
                    "inviteeName": "Emma Watson",
                    "inviteeEmail": "emmawatson@gmail.com",
                    "meetingStartTime": "2019-08-20T18:37:00.000Z",
                    "meetingEndTime": "2019-08-21T18:37:00.000Z",
                    "meetingVenue": "Gurgaon",
                    "createdOn": "2019-08-18T19:54:51.000Z"
                }
            }
    */

    app.get(`${baseUrl}/meeting/all/:userId`, userController.getAllMeetingsOfUser)
    /**
     * @apiGroup meeting
     * @apiVersion  1.0.0
     * @api {get} /api/v1/meeting/all/:userId api to get all meetings of a user.
     *
     * @apiParam {string} userId user's Id. (body params) (required)
     * 
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Meetings found!",
                "status": 200,
                "data": [
                    {
                        "meetingId": "tThyvfQ9I",
                        "meetingName": "Vaibhav's Test Meeting!",
                        "inviterId": "DEua7V301",
                        "inviterName": "bald witch",
                        "inviterEmail": "baldwitch5@gmail.com",
                        "inviteeId": "gY9PxM0oA",
                        "inviteeName": "vaibhav udaywal",
                        "inviteeEmail": "baldwitch5@gmail.com",
                        "meetingStartTime": "2019-08-27T14:40:00.000Z",
                        "meetingEndTime": "2019-08-27T15:30:00.000Z",
                        "meetingVenue": "Noida",
                        "createdOn": "2019-08-16T05:29:17.000Z",
                        "_id": "5d563f2db52b271b6cbc99ab",
                        "__v": 0
                    }
                ]
            }
    */

    app.post(`${baseUrl}/meeting/update/:meetingId`, userController.updateMeeting)
    /**
     * @apiGroup meeting
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/update/:meetingId api for updating a meeting.
     *
     * @apiParam {string} meetingName meeting name. (body params)
     * @apiParam {date} meetingStartTime meeting start time. (body params)
     * @apiParam {date} meetingEndTime meeting end time. (body params)
     * @apiParam {string} meetingVenue meeting venue. (body params)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "meeting scheduled successfully!",
                "status": 200,
                "data": {
                    "meetingId": "mL6RBcnJc",
                    "meetingName": "Test Meeting Updated",
                    "inviterId": "aSHsm7h9n",
                    "inviterName": "Albus Dumbledore",
                    "inviterEmail": "dumbledore@gmail.com",
                    "inviteeId": "",
                    "inviteeName": "Emma Watson",
                    "inviteeEmail": "emmawatson@gmail.com",
                    "meetingStartTime": "2019-08-20T18:37:00.000Z",
                    "meetingEndTime": "2019-08-21T18:37:00.000Z",
                    "meetingVenue": "Noida",
                    "createdOn": "2019-08-18T19:54:51.000Z"
                }
            }
    */

    app.get(`${baseUrl}/meeting/:meetingId`, userController.getMeeting)
    /**
     * @apiGroup meeting
     * @apiVersion  1.0.0
     * @api {get} /api/v1/meeting/:meetingId api to get a meeting details.
     *
     * @apiParam {string} meetingId meeting Id. (body params) (required)
     * 
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Meeting found!",
                "status": 200,
                "data": {
                    "meetingId": "tThyvfQ9I",
                    "meetingName": "Vaibhav's Test Meeting!",
                    "inviterId": "DEua7V301",
                    "inviterName": "bald witch",
                    "inviterEmail": "baldwitch5@gmail.com",
                    "inviteeId": "gY9PxM0oA",
                    "inviteeName": "vaibhav udaywal",
                    "inviteeEmail": "baldwitch5@gmail.com",
                    "meetingStartTime": "2019-08-27T14:40:00.000Z",
                    "meetingEndTime": "2019-08-27T15:30:00.000Z",
                    "meetingVenue": "Noida",
                    "createdOn": "2019-08-16T05:29:17.000Z",
                    "_id": "5d563f2db52b271b6cbc99ab",
                    "__v": 0
                }
            }
    */

    app.post(`${baseUrl}/meeting/delete`, userController.deleteMeeting)
    /**
     * @apiGroup meeting
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/delete api for deleting a meeting.
     *
     * @apiParam {string} meetingId meeting Id. (body params) (required)
     * 
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Meeting deleted!",
                "status": 200,
                "data": {
                    "meetingId": "tThyvfQ9I",
                    "meetingName": "Vaibhav's Test Meeting!",
                    "inviterId": "DEua7V301",
                    "inviterName": "bald witch",
                    "inviterEmail": "baldwitch5@gmail.com",
                    "inviteeId": "gY9PxM0oA",
                    "inviteeName": "vaibhav udaywal",
                    "inviteeEmail": "baldwitch5@gmail.com",
                    "meetingStartTime": "2019-08-27T14:40:00.000Z",
                    "meetingEndTime": "2019-08-27T15:30:00.000Z",
                    "meetingVenue": "Noida",
                    "createdOn": "2019-08-16T05:29:17.000Z",
                    "_id": "5d563f2db52b271b6cbc99ab",
                    "__v": 0
                }
            }
    */

}

module.exports = {
    setRouter: setRouter
}