'use strict'

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let meetingSchema = new Schema({

    meetingId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },

    meetingName: {
        type: String,
        default: ''
    },

    inviterId: {
        type: String,
        default: ''
    },

    inviterName: {
        type: String,
        default: ''
    },

    inviterEmail: {
        type: String,
        default: ''
    },

    inviteeId: {
        type: String,
        default: ''
    },

    inviteeName: {
        type: String,
        default: ''
    },

    inviteeEmail: {
        type: String,
        default: ''
    },

    meetingStartTime: {
        type: Date,
        default: ''
    },

    meetingEndTime: {
        type: Date,
        default: ''
    },

    meetingVenue: {
        type: String,
        default: ''
    },

    createdOn: {
        type: Date,
        default: ""
    }

})

module.exports = mongoose.model('Meeting', meetingSchema);