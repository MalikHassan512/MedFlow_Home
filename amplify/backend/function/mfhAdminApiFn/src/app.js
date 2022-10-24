/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	AUTH_MFAPPE617DBC2_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const {
  getTestAutoNumber,
  addUserToGroup,
  removeUserFromGroup,
  confirmUserSignUp,
  disableUser,
  enableUser,
  getUser,
  listUsers,
  listGroups,
  listGroupsForUser,
  listUsersInGroup,
  signUserOut,
  updateUserInfo,
  updateAssociatedData,
  updateUserPassword,
  deleteUser,
  sendEmailAttachement,
  sendPreRegistrationEmail,
} = require("./cognitoActions");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Only perform tasks if the user is in a specific group
const allowedGroup = process.env.GROUP.split(",");

const checkGroup = function (req, res, next) {
  if (req.path == "/signUserOut") {
    return next();
  }

  if (typeof allowedGroup === "undefined" || allowedGroup === "NONE") {
    return next();
  }

  // Fail if group enforcement is being used
  if (req.apiGateway.event.requestContext.authorizer.claims["cognito:groups"]) {
    const groups = req.apiGateway.event.requestContext.authorizer.claims["cognito:groups"].split(",");
    if (
      !(
        allowedGroup &&
        (groups.indexOf(allowedGroup[0]) > -1 ||
          groups.indexOf(allowedGroup[1]) > -1 ||
          groups.indexOf(allowedGroup[2]) > -1)
      )
    ) {
      const err = new Error(
        `User does not have permissions to perform administrative Actions ${groups} ${allowedGroup}`
      );
      next(err);
    }
  } else {
    const err = new Error(`Cognito User does not have permissions to perform administrative tasks`);
    err.statusCode = 403;
    next(err);
  }
  next();
};

app.all("*", checkGroup);

app.post("/addUserToGroup", async (req, res, next) => {
  if (!req.body.username || !req.body.groupname) {
    const err = new Error("username and groupname are required");
    err.statusCode = 400;
    return next(err);
  }

  try {
    const response = await addUserToGroup(req.body.username, req.body.groupname);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.post("/removeUserFromGroup", async (req, res, next) => {
  if (!req.body.username || !req.body.groupname) {
    const err = new Error("username and groupname are required");
    err.statusCode = 400;
    return next(err);
  }

  try {
    const response = await removeUserFromGroup(req.body.username, req.body.groupname);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.post("/confirmUserSignUp", async (req, res, next) => {
  if (!req.body.username) {
    const err = new Error("username is required");
    err.statusCode = 400;
    return next(err);
  }

  try {
    const response = await confirmUserSignUp(req.body.username);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.post("/disableUser", async (req, res, next) => {
  if (!req.body.username) {
    const err = new Error("username is required");
    err.statusCode = 400;
    return next(err);
  }

  try {
    const response = await disableUser(req.body.username);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.post("/enableUser", async (req, res, next) => {
  if (!req.body.username) {
    const err = new Error("username is required");
    err.statusCode = 400;
    return next(err);
  }

  try {
    const response = await enableUser(req.body.username);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.get("/getUser", async (req, res, next) => {
  if (!req.query.username) {
    const err = new Error("username is required");
    err.statusCode = 400;
    return next(err);
  }

  try {
    const response = await getUser(req.query.username);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.get("/listUsers", async (req, res, next) => {
  try {
    let response;
    if (req.query.token) {
      response = await listUsers(req.query.limit || 25, req.query.token);
    } else if (req.query.limit) {
      response = await listUsers((Limit = req.query.limit));
    } else {
      response = await listUsers();
    }
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.get("/listGroups", async (req, res, next) => {
  try {
    let response;
    if (req.query.token) {
      response = await listGroups(req.query.limit || 25, req.query.token);
    } else if (req.query.limit) {
      response = await listGroups((Limit = req.query.limit));
    } else {
      response = await listGroups();
    }
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.get("/listGroupsForUser", async (req, res, next) => {
  if (!req.query.username) {
    const err = new Error("username is required");
    err.statusCode = 400;
    return next(err);
  }

  try {
    let response;
    if (req.query.token) {
      response = await listGroupsForUser(req.query.username, req.query.limit || 25, req.query.token);
    } else if (req.query.limit) {
      response = await listGroupsForUser(req.query.username, (Limit = req.query.limit));
    } else {
      response = await listGroupsForUser(req.query.username);
    }
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.get("/listUsersInGroup", async (req, res, next) => {
  if (!req.query.groupname) {
    const err = new Error("groupname is required");
    err.statusCode = 400;
    return next(err);
  }

  try {
    let response;
    if (req.query.token) {
      response = await listUsersInGroup(req.query.groupname, req.query.limit || 25, req.query.token);
    } else if (req.query.limit) {
      response = await listUsersInGroup(req.query.groupname, (Limit = req.query.limit));
    } else {
      response = await listUsersInGroup(req.query.groupname);
    }
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.post("/signUserOut", async (req, res, next) => {
  /**
   * To prevent rogue actions of users with escalated privilege signing
   * other users out, we ensure it's the same user making the call
   * Note that this only impacts actions the user can do in User Pools
   * such as updating an attribute, not services consuming the JWT
   */
  if (
    req.body.username != req.apiGateway.event.requestContext.authorizer.claims.username &&
    req.body.username != /[^/]*$/.exec(req.apiGateway.event.requestContext.identity.userArn)[0]
  ) {
    const err = new Error("only the user can sign themselves out");
    err.statusCode = 400;
    return next(err);
  }

  try {
    const response = await signUserOut(req.body.username);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.post("/updateUserInfo", async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.firstName || !req.body.lastName) {
    const err = new Error("All field are required");
    err.statusCode = 400;
    return next(err);
  }

  const { username, email, firstName, lastName, note, clientID } = req.body;

  try {
    const response = await updateUserInfo(username, email, firstName, lastName, note, clientID);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.post("/updateAssociatedInfo", async (req, res, next) => {
  if (!req.body.username || !req.body.note) {
    const err = new Error("All field are required");
    err.statusCode = 400;
    return next(err);
  }

  const { username, note } = req.body;

  try {
    const response = await updateAssociatedData(username, note);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.post("/updateUserPassword", async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    const err = new Error("All field are required");
    err.statusCode = 400;
    return next(err);
  }

  const { username, password } = req.body;

  try {
    const response = await updateUserPassword(username, password);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.post("/deleteUser", async (req, res, next) => {
  if (!req.body.username) {
    const err = new Error("User name required");
    err.statusCode = 400;
    return next(err);
  }

  const { username } = req.body;

  try {
    const response = await deleteUser(username);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

app.post("/sendEmailAttachement", async (req, res, next) => {
  if (!req.body.data) {
    const err = new Error("User data required");
    err.statusCode = 400;
    return next(err);
  }

  const { data, isPortalCall } = req.body;
  if (isPortalCall) {
    try {
      for (const item of data) {
        const response = await sendEmailAttachement(item.email, item.fileName, item.fileDisclaimer);
      }
      res.status(200).json({ message: "Ok" });
    } catch (err) {
      next(err);
    }
  } else {
    res.status(200).json({ message: "Ok" });
  }
});

app.post("/sendInvitationEmail", async (req, res, next) => {
  if (!req.body.data) {
    const err = new Error("Email data required");
    err.statusCode = 400;
    return next(err);
  }

  const { data } = req.body;
  try {
    for (const item of data) {
      const response = await sendPreRegistrationEmail(item.email, item.msg);
    }
    res.status(200).json({ message: "Ok" });
  } catch (err) {
    next(err);
  }
});

app.post("/getAutoNumber", async (req, res, next) => {
  try {
    const response = await getTestAutoNumber();
    res.status(200).json({ counter: response });
  } catch (err) {
    next(err);
  }
});

// Error middleware must be defined last
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).json({ message: err.message }).end();
});

app.listen(3000, () => {
  console.log("App started");
});

module.exports = app;
