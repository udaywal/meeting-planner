define({ "api": [
  {
    "group": "meeting",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/meeting/all/:userId",
    "title": "api to get all meetings of a user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>user's Id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Meetings found!\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"meetingId\": \"tThyvfQ9I\",\n            \"meetingName\": \"Vaibhav's Test Meeting!\",\n            \"inviterId\": \"DEua7V301\",\n            \"inviterName\": \"bald witch\",\n            \"inviterEmail\": \"baldwitch5@gmail.com\",\n            \"inviteeId\": \"gY9PxM0oA\",\n            \"inviteeName\": \"vaibhav udaywal\",\n            \"inviteeEmail\": \"baldwitch5@gmail.com\",\n            \"meetingStartTime\": \"2019-08-27T14:40:00.000Z\",\n            \"meetingEndTime\": \"2019-08-27T15:30:00.000Z\",\n            \"meetingVenue\": \"Noida\",\n            \"createdOn\": \"2019-08-16T05:29:17.000Z\",\n            \"_id\": \"5d563f2db52b271b6cbc99ab\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "meeting",
    "name": "GetApiV1MeetingAllUserid"
  },
  {
    "group": "meeting",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/meeting/:meetingId",
    "title": "api to get a meeting details.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>meeting Id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Meeting found!\",\n    \"status\": 200,\n    \"data\": {\n        \"meetingId\": \"tThyvfQ9I\",\n        \"meetingName\": \"Vaibhav's Test Meeting!\",\n        \"inviterId\": \"DEua7V301\",\n        \"inviterName\": \"bald witch\",\n        \"inviterEmail\": \"baldwitch5@gmail.com\",\n        \"inviteeId\": \"gY9PxM0oA\",\n        \"inviteeName\": \"vaibhav udaywal\",\n        \"inviteeEmail\": \"baldwitch5@gmail.com\",\n        \"meetingStartTime\": \"2019-08-27T14:40:00.000Z\",\n        \"meetingEndTime\": \"2019-08-27T15:30:00.000Z\",\n        \"meetingVenue\": \"Noida\",\n        \"createdOn\": \"2019-08-16T05:29:17.000Z\",\n        \"_id\": \"5d563f2db52b271b6cbc99ab\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "meeting",
    "name": "GetApiV1MeetingMeetingid"
  },
  {
    "group": "meeting",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/create",
    "title": "api for creating a new meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingName",
            "description": "<p>meeting name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviterId",
            "description": "<p>admin's id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviterName",
            "description": "<p>admin's name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviterEmail",
            "description": "<p>admin's email. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviteeId",
            "description": "<p>invitee's id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviteeName",
            "description": "<p>invitee's name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviteeEmail",
            "description": "<p>invitee's email. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "meetingStartTime",
            "description": "<p>meeting start time. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "meetingEndTime",
            "description": "<p>meeting end time. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingVenue",
            "description": "<p>meeting venue. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"meeting scheduled successfully!\",\n    \"status\": 200,\n    \"data\": {\n        \"meetingId\": \"mL6RBcnJc\",\n        \"meetingName\": \"Test Meeting\",\n        \"inviterId\": \"aSHsm7h9n\",\n        \"inviterName\": \"Albus Dumbledore\",\n        \"inviterEmail\": \"dumbledore@gmail.com\",\n        \"inviteeId\": \"\",\n        \"inviteeName\": \"Emma Watson\",\n        \"inviteeEmail\": \"emmawatson@gmail.com\",\n        \"meetingStartTime\": \"2019-08-20T18:37:00.000Z\",\n        \"meetingEndTime\": \"2019-08-21T18:37:00.000Z\",\n        \"meetingVenue\": \"Gurgaon\",\n        \"createdOn\": \"2019-08-18T19:54:51.000Z\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "meeting",
    "name": "PostApiV1MeetingCreate"
  },
  {
    "group": "meeting",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/delete",
    "title": "api for deleting a meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>meeting Id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Meeting deleted!\",\n    \"status\": 200,\n    \"data\": {\n        \"meetingId\": \"tThyvfQ9I\",\n        \"meetingName\": \"Vaibhav's Test Meeting!\",\n        \"inviterId\": \"DEua7V301\",\n        \"inviterName\": \"bald witch\",\n        \"inviterEmail\": \"baldwitch5@gmail.com\",\n        \"inviteeId\": \"gY9PxM0oA\",\n        \"inviteeName\": \"vaibhav udaywal\",\n        \"inviteeEmail\": \"baldwitch5@gmail.com\",\n        \"meetingStartTime\": \"2019-08-27T14:40:00.000Z\",\n        \"meetingEndTime\": \"2019-08-27T15:30:00.000Z\",\n        \"meetingVenue\": \"Noida\",\n        \"createdOn\": \"2019-08-16T05:29:17.000Z\",\n        \"_id\": \"5d563f2db52b271b6cbc99ab\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "meeting",
    "name": "PostApiV1MeetingDelete"
  },
  {
    "group": "meeting",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/update/:meetingId",
    "title": "api for updating a meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingName",
            "description": "<p>meeting name. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "meetingStartTime",
            "description": "<p>meeting start time. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "meetingEndTime",
            "description": "<p>meeting end time. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingVenue",
            "description": "<p>meeting venue. (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"meeting scheduled successfully!\",\n    \"status\": 200,\n    \"data\": {\n        \"meetingId\": \"mL6RBcnJc\",\n        \"meetingName\": \"Test Meeting Updated\",\n        \"inviterId\": \"aSHsm7h9n\",\n        \"inviterName\": \"Albus Dumbledore\",\n        \"inviterEmail\": \"dumbledore@gmail.com\",\n        \"inviteeId\": \"\",\n        \"inviteeName\": \"Emma Watson\",\n        \"inviteeEmail\": \"emmawatson@gmail.com\",\n        \"meetingStartTime\": \"2019-08-20T18:37:00.000Z\",\n        \"meetingEndTime\": \"2019-08-21T18:37:00.000Z\",\n        \"meetingVenue\": \"Noida\",\n        \"createdOn\": \"2019-08-18T19:54:51.000Z\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "meeting",
    "name": "PostApiV1MeetingUpdateMeetingid"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/all",
    "title": "api to get all users(admin+normal).",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User details found!\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"userId\": \"gY9PxM0oA\",\n            \"firstName\": \"vaibhav\",\n            \"lastName\": \"udaywal\",\n            \"email\": \"vaibhav@gmail.com\",\n            \"country\": \"IN\",\n            \"mobile\": 7845122356,\n            \"password\": \"$2a$10$Yi6zTYeCJyvjjlaVcG1Xguc0fbFjDVwIAMDMusUvpihSo8RBIwsQi\",\n            \"createdOn\": \"2019-08-12T15:23:45.000Z\",\n            \"_id\": \"5d51848105a8a524cc24a5f7\",\n            \"isAdmin\": true,\n            \"__v\": 0\n        },\n        {\n            \"userId\": \"Z5QqGoGOB\",\n            \"firstName\": \"leo\",\n            \"lastName\": \"messi\",\n            \"email\": \"messi@gmail.com\",\n            \"country\": \"IN\",\n            \"mobile\": 7845125689,\n            \"password\": \"$2a$10$4BjXWD5qyv8iD.56dtPc7eDKr.Mnre4Qv8H3pfcaWXntpSg0G4jAK\",\n            \"createdOn\": \"2019-08-12T16:17:07.000Z\",\n            \"_id\": \"5d519103466fcb17ec773686\",\n            \"isAdmin\": false,\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "GetApiV1UsersAll"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/forgotpassword",
    "title": "api to get password link in email.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>user email. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Password reset link sent Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostApiV1Forgotpassword"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/login",
    "title": "api for sign in.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Welcome Back! Login succesful!\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImdOb1RZWVhzViIsImlhdCI6MTU2NjE1NTc2MzkxOSwiZXhwIjoxNTY2MjQyMTYzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IktGSjhzdUZZTCIsImZpcnN0TmFtZSI6IkVtbWEiLCJsYXN0TmFtZSI6IldhdHNvbiIsImVtYWlsIjoiZW1tYXdhdHNvbkBnbWFpbC5jb20iLCJjb3VudHJ5IjoiRW5nbGFuZCIsIm1vYmlsZSI6NzI0MDI3NzI0MSwiaXNBZG1pbiI6ZmFsc2V9fQ.qg2OZJ1Y6VA-dRUgZjl47-CrRV7C0JTcDyOONRooDaw\",\n        \"userDetails\": {\n            \"userId\": \"KFJ8suFYL\",\n            \"firstName\": \"Emma\",\n            \"lastName\": \"Watson\",\n            \"email\": \"emmawatson@gmail.com\",\n            \"country\": \"England\",\n            \"mobile\": 7240277241,\n            \"isAdmin\": false\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostApiV1Login"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/logout",
    "title": "api to sign out active user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "activeUserId",
            "description": "<p>loggedin userId of the the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"logout successful!\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"tokenGenerationTime\": \"2019-08-18T19:16:03.000Z\",\n            \"_id\": \"5d59a3f3d182a603d8ed02fd\",\n            \"userId\": \"KFJ8suFYL\",\n            \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImdOb1RZWVhzViIsImlhdCI6MTU2NjE1NTc2MzkxOSwiZXhwIjoxNTY2MjQyMTYzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IktGSjhzdUZZTCIsImZpcnN0TmFtZSI6IkVtbWEiLCJsYXN0TmFtZSI6IldhdHNvbiIsImVtYWlsIjoiZW1tYXdhdHNvbkBnbWFpbC5jb20iLCJjb3VudHJ5IjoiRW5nbGFuZCIsIm1vYmlsZSI6NzI0MDI3NzI0MSwiaXNBZG1pbiI6ZmFsc2V9fQ.qg2OZJ1Y6VA-dRUgZjl47-CrRV7C0JTcDyOONRooDaw\",\n            \"tokenSecret\": \"someVeryRandomStringThatNobodyCanGuessLiterallyNobodyCanGuess\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostApiV1Logout"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/resetPassword",
    "title": "api to set new password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>user's Id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>new password. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Password changed Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostApiV1Resetpassword"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/signup",
    "title": "api for sign up.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastname",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobile",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country",
            "description": "<p>country Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>true-if user is admin and false-if user is not admin. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Congrats! user created succesfully!\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"KFJ8suFYL\",\n        \"firstName\": \"Emma\",\n        \"lastName\": \"Watson\",\n        \"email\": \"emmawatson@gmail.com\",\n        \"country\": \"England\",\n        \"mobile\": 7240277241,\n        \"createdOn\": \"2019-08-18T19:04:58.000Z\",\n        \"isAdmin\": false\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostApiV1Signup"
  }
] });
