const mongoose = require('mongoose');

const paramsValidationLib = require('../libs/paramsValidationLib')
const response = require('../libs/responseLib')
const checkLib = require('../libs/checkLib')
const passwordLib = require('../libs/generatePasswordLib')
const timeLib = require('../libs/timeLib')
const tokenLib = require('../libs/tokenLib')

const UserModel = require('../models/User')
const AuthModel = require('../models/Auth')
const MeetingModel = require('../models/Meeting')

const shortid = require('shortid')
const emailLib = require('../libs/emailLib')

/*---------------------------------------------------------------------------------------------
# USER - User Signup API
----------------------------------------------------------------------------------------------*/

let signupFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!paramsValidationLib.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Please enter the correct email!', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                let apiResponse = response.generate(true, 'Email is missing!', 400, null)
                reject(apiResponse)
            }
        })
    }

    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email }, (err, retrievedUserDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to create user!', 500, err)
                    reject(apiResponse)
                } else if (checkLib.isEmpty(retrievedUserDetails)) {

                    let newUser = new UserModel({
                        userId: shortid.generate(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email.toLowerCase(),
                        country: req.body.country,
                        mobile: req.body.mobile,
                        password: passwordLib.hashpassword(req.body.password),
                        isAdmin: req.body.isAdmin,
                        createdOn: timeLib.now()
                    })
                    newUser.save((err, newUserDetails) => {
                        if (err) {
                            let apiResponse = response.generate(true, 'Failed to save user!', 500, err)
                            reject(apiResponse)
                        } else {
                            let newUserDetailsObj = newUserDetails.toObject()
                            delete newUserDetailsObj.password
                            delete newUserDetailsObj.__v
                            delete newUserDetailsObj._id
                            let apiResponse = response.generate(false, 'Congrats! user created succesfully!', 200, newUserDetailsObj)
                            resolve(apiResponse)
                        }
                    })

                } else {
                    let apiResponse = response.generate(true, 'You are already registered! Please login!', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    validateUserInput(req, res)
        .then(createUser)
        .then((apiResponse) => {
            res.send(apiResponse)
        }).catch((apiResponse) => {
            res.send(apiResponse)
        })

}

/*---------------------------------------------------------------------------------------------
# USER - User Login API
----------------------------------------------------------------------------------------------*/

let loginFunction = (req, res) => {

    let verifyLogin = (req, res) => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                UserModel.findOne({ email: req.body.email }, (err, userData) => {
                    if (err) {
                        let apiResponse = response.generate(true, 'Failed to find user!', 500, err)
                        reject(apiResponse)
                    } else if (checkLib.isEmpty(userData)) {
                        let apiResponse = response.generate(true, 'No user details found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(userData)
                    }
                })
            } else {
                let apiResponse = response.generate(true, 'Please enter a correct email!', 400, null)
                reject(apiResponse)
            }
        })
    }

    let passwordValidation = (userData) => {
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, userData.password, (err, isMatch) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to compare password!', 500, err)
                    reject(apiResponse)
                } else if (isMatch) {
                    let userDataObj = userData.toObject()
                    delete userDataObj.password
                    delete userDataObj.__v
                    delete userDataObj._id
                    delete userDataObj.createdOn
                    resolve(userDataObj)
                } else {
                    let apiResponse = response.generate(true, 'Please enter correct password!', 400, null)
                    reject(apiResponse)
                }
            })
        })

    }

    let getToken = (userData) => {
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userData, (err, tokenDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to generate token!', 500, err)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userData.userId,
                        tokenDetails.userDetails = userData
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveAuthData = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, err)
                    reject(apiResponse)
                } else if (checkLib.isEmpty(retrievedTokenDetails)) {
                    let newAuth = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: timeLib.now()
                    })
                    newAuth.save((err, newTokenDetails) => {
                        if (err) {
                            let apiResponse = response.generate(true, 'Failed to create auth token!', 500, err)
                            reject(apiResponse)
                        } else {
                            let authUserData = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            let apiResponse = response.generate(false, 'Welcome Back! Login succesful!', 200, authUserData)
                            resolve(apiResponse)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = timeLib.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, err)
                            reject(apiResponse)
                        } else {
                            let authUserData = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            let apiResponse = response.generate(false, 'Welcome Back!', 200, authUserData)
                            resolve(apiResponse)
                        }
                    })
                }
            })
        })
    }

    verifyLogin(req, res)
        .then(passwordValidation)
        .then(getToken)
        .then(saveAuthData)
        .then((apiResponse) => {
            res.send(apiResponse)
        }).catch((apiResponse) => {
            res.send(apiResponse)
        })

}

/*---------------------------------------------------------------------------------------------
# USER - Get all user API
----------------------------------------------------------------------------------------------*/

let getAllUsers = (req, res) => {
    UserModel.find((err, allUsers) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to get user details!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(allUsers)) {
            let apiResponse = response.generate(true, 'No user details found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User details found!', 200, allUsers)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# USER - Forgot Password API
----------------------------------------------------------------------------------------------*/

let forgotPassword = (req, res) => {
    UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
            if (err) {
                let apiResponse = response.generate(true, 'failed to find user!', 500, err);
                res.send(apiResponse);
            } else if (checkLib.isEmpty(userDetails)) {
                let apiResponse = response.generate(true, 'No user details found', 404, null);
                res.send(apiResponse);
            } else {
                emailDetails = {
                    name: userDetails.firstName + ' ' + userDetails.lastName,
                    email: userDetails.email,
                    subject: 'Reset Password!',
                    html: 
                    `<h4> Hello ${userDetails.firstName},</h4>
                    <p>
                        <a href='http://localhost:4200/resetpassword/${userDetails.userId}'>
                        Click here to reset password</a>
                    </p>
                    <br><b>Cheers!</b>
                    <br><b>HiringAdda Team</b>`
                }
                emailLib.sendEmail(emailDetails);
                let apiResponse = response.generate(false, 'Password reset link sent Successfully', 200, null);
                res.send(apiResponse);
            }
        })
}

/*---------------------------------------------------------------------------------------------
# USER - Reset Password API
----------------------------------------------------------------------------------------------*/

let resetPassword = (req, res) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.userId) {
                UserModel.findOne({ userId: req.body.userId }, (err, userDetails) => {
                        if (err) {
                            let apiResponse = response.generate(true, 'failed to find user', 500, err);
                            reject(apiResponse);
                        } else if (checkLib.isEmpty(userDetails)) {
                            let apiResponse = response.generate(true, 'User not found', 404, null);
                            reject(apiResponse);
                        } else {
                            resolve(userDetails);
                        }
                    })
            } else {
                let apiResponse = response.generate(true, 'Bad request, userId missing', 400, null);
                reject(apiResponse);
            }
        });
    }

    let updatePassword = (userDetails) => {
        return new Promise((resolve, reject) => {
            UserModel.update({ userId: req.body.userId }, { password: passwordLib.hashpassword(req.body.password) }, { multi: true }, (err, result) => {
                        if (err) {
                            let apiResponse = response.generate(true, 'failed to change password', 500, err);
                            reject(apiResponse);
                        } else if (checkLib.isEmpty(result)) {
                            let apiResponse = response.generate(true, 'User not found', 404, null);
                            reject(apiResponse);
                        } else {
                            emailDetails = {
                                name: userDetails.firstName + ' ' + userDetails.lastName,
                                email: userDetails.email,
                                subject: 'Password changed!',
                                html: 
                                `<h4> Hello ${userDetails.firstName},</h4>
                                <p>
                                    Your password has been changed succesfully!
                                </p>
                                <br><b>Cheers!</b>
                                <br><b>HiringAdda Team</b>`
                            }
                            emailLib.sendEmail(emailDetails);
                            let apiResponse = response.generate(false, 'Password changed Successfully', 200, null);
                            resolve(apiResponse);
                        }
                    });
        });
    }

    findUser(req, res)
        .then(updatePassword)
        .then((apiResponse) => {
            res.send(apiResponse)
        }).catch((apiResponse) => {
            res.send(apiResponse)
        })

}

/*---------------------------------------------------------------------------------------------
# USER - Logout User API
----------------------------------------------------------------------------------------------*/

let logout = (req, res) => {
    AuthModel.find({ userId: req.body.activeUserId }, (err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'failed to log out!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = response.generate(true, 'already logout!', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'logout successful!', 200, result)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# MEETING - Get Meetings of a User API
----------------------------------------------------------------------------------------------*/

let getAllMeetingsOfUser = (req, res) => {
    MeetingModel.find({ inviteeId: req.params.userId }, (err, userMeetings) => {
        if (err) {
            let apiResponse = response.generate(true, 'failed to find meetings!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(userMeetings)) {
            let apiResponse = response.generate(true, 'No meetings found!', 404, null)
            res.send(apiResponse)
        } else {
            console.log(userMeetings)
            let apiResponse = response.generate(false, 'Meetings found!', 200, userMeetings)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# MEETING - Create a Meeting API
----------------------------------------------------------------------------------------------*/

let createMeeting = (req, res) => {
    let newMeeting = new MeetingModel({
        meetingId: shortid.generate(),
        meetingName: req.body.meetingName,
        inviterId: req.body.inviterId,
        inviterName: req.body.inviterName,
        inviterEmail: req.body.inviterEmail.toLowerCase(),
        inviteeId: req.body.inviteeId,
        inviteeName: req.body.inviteeName,
        inviteeEmail: req.body.inviteeEmail.toLowerCase(),
        meetingStartTime: req.body.meetingStartTime,
        meetingEndTime: req.body.meetingEndTime,
        meetingVenue: req.body.meetingVenue,
        createdOn: timeLib.now()
    })
    newMeeting.save((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to save meeting', 500, err)
            res.send(apiResponse)
        } else {
            emailDetails = {
                name: req.body.inviteeName,
                email: req.body.inviteeEmail,
                subject: 'Hey, you got a new meeting!',
                html: 
                `<h4> Hello ${req.body.inviteeName},</h4>
                <p>
                    A new meeting is scheduled by ${req.body.inviterName}<br>
                    Title : ${req.body.meetingName}<br>
                    From : ${req.body.meetingStartTime}<br> 
                    To : ${req.body.meetingEndTime}<br>
                    At : ${req.body.meetingVenue}<br>
                    <br>Checkout your dashboard for more details.
                </p>
                <br><b>Cheers!</b>
                <br><b>HiringAdda Team</b>`
            }
            emailLib.sendEmail(emailDetails);
            let resultObj = result.toObject()
            delete resultObj.__v
            delete resultObj._id
            let apiResponse = response.generate(false, 'meeting scheduled successfully!', 200, resultObj)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# MEETING - Update a Meeting API
----------------------------------------------------------------------------------------------*/

let updateMeeting = (req, res) => {

    let options = req.body;
    MeetingModel.findOneAndUpdate({ meetingId: req.params.meetingId }, options, ((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'failed To update meeting', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = response.generate(true, 'no meeting found', 404, null)
            res.send(apiResponse)
        } else {
            emailDetails = {
                name: result.inviteeName,
                email: result.inviteeEmail,
                subject: 'Your Meeting Updated!',
                html: 
                `<h3> Hello ${result.inviteeName},</h3>
                <p>
                    Your meeting is updated by ${result.inviterName}<br>
                    Title : ${result.meetingName}<br>
                    <br>Checkout your dashboard for more details.
                </p>
                <br><b>Cheers!</b>
                <br><b>HiringAdda Team</b>`
            }
            emailLib.sendEmail(emailDetails);
            let apiResponse = response.generate(false, 'meeting details updated!', 200, result)
            res.send(apiResponse)
        }
    })
    )

}

/*---------------------------------------------------------------------------------------------
# MEETING - View a Meeting API
----------------------------------------------------------------------------------------------*/

let getMeeting = (req, res) => {
    MeetingModel.findOne({ meetingId: req.params.meetingId }, (err, userMeeting) => {
        if (err) {
            let apiResponse = response.generate(true, 'failed to find meeting!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(userMeeting)) {
            let apiResponse = response.generate(true, 'No meeting found!', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Meeting found!', 200, userMeeting)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# MEETING - Delete a Meeting API
----------------------------------------------------------------------------------------------*/

let deleteMeeting = (req, res) => {
    MeetingModel.findOneAndRemove({ meetingId: req.body.meetingId }, (err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'failed to delete meeting!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = response.generate(true, 'No meeting found!', 404, null)
            res.send(apiResponse)
        } else {
            console.log(result)
            emailDetails = {
                name: result.inviteeName,
                email: result.inviteeEmail,
                subject: 'Your Meeting Cancelled!',
                html: 
                `<h3> Hello ${result.inviteeName},</h3>
                <p>
                    Your meeting is updated by ${result.inviterName}<br>
                    Title : ${result.meetingName}<br>
                    <br>Checkout your dashboard for more details.
                </p>
                <b>Cheers!</b>
                <br><b>HiringAdda Team</b>`
            }
            emailLib.sendEmail(emailDetails);
            let apiResponse = response.generate(false, 'Meeting deleted!', 200, result)
            res.send(apiResponse)
        }
    })
}

module.exports = {
    signupFunction: signupFunction,
    loginFunction: loginFunction,
    getAllUsers: getAllUsers,
    logout: logout,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,

    createMeeting: createMeeting,
    getAllMeetingsOfUser: getAllMeetingsOfUser,
    updateMeeting: updateMeeting,
    getMeeting: getMeeting,
    deleteMeeting: deleteMeeting
}