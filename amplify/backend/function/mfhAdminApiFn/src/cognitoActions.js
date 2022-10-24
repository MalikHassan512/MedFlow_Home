/* eslint-disable */
/*
 * Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

const { CognitoIdentityServiceProvider, SES, S3, DynamoDB } = require("aws-sdk");

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const ses = new SES({ region: "eu-west-1" });
const s3 = new S3({
  region: "eu-west-1",
  apiVersion: "2006-03-01",
});
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  SES: ses,
});
const userPoolId = process.env.USERPOOL;

async function getTestAutoNumber() {
  try {
    const docClient = new DynamoDB.DocumentClient();
    const params = {
      TableName: process.env.TABLE_EMPLOYEE_TEST_COUNTER,
    };
    const data = await docClient.scan(params).promise();
    const id = data.Items[0].id;
    const counter = data.Items[0].counter + 1;
    console.log("Counter", data.Items[0]);
    const updateParams = {
      TableName: process.env.TABLE_EMPLOYEE_TEST_COUNTER,
      Key: {
        id: id,
      },
      UpdateExpression: "set #S = :s",
      ExpressionAttributeValues: {
        ":s": counter,
      },
      ExpressionAttributeNames: {
        "#S": "counter",
      },
      ReturnValues: "UPDATED_NEW",
    };
    await docClient.update(updateParams).promise();
    return counter;
  } catch (err) {
    throw err;
  }
  return 1;
}

async function sendEmailAttachement(email, fileName, fileDisclaimer) {
  try {
    const fileParams = {
      Bucket: "mfapp-storage-c98c9ede110752-staging",
      Key: fileName,
    };
    const fileContent = await s3.getObject(fileParams).promise();
    const fileAttachments = [
      {
        filename: "result.pdf",
        content: fileContent.Body,
      },
    ];
    if (fileDisclaimer) {
      try {
        const disclaimerContent = await s3.getObject(fileParams).promise();
        fileAttachments.push({
          filename: "disclaimer.pdf",
          content: disclaimerContent.Body,
        });
      } catch (error) {}
    }

    const info = await transporter.sendMail({
      from: "SafeCamp Testing <info@gosafecamp.com>",
      to: email,
      subject: "SafeCamp Test Results",
      html: `<p>Hello,<br><br>Please see the attached results for your review. Thank you for testing with us.<br><br>Best Regards, <br>SafeCamp Team</p>`,
      attachments: fileAttachments,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
  return {
    message: "Ok",
  };
}

async function sendPreRegistrationEmail(email, msg) {
  try {

    const info = await transporter.sendMail({
      from: "SafeCamp Testing <info@gosafecamp.com>",
      to: email,
      subject: "Pre-Registration",
      html: msg
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
  return {
    message: "Ok",
  };
}

async function addUserToGroup(username, groupname) {
  const params = {
    GroupName: groupname,
    UserPoolId: userPoolId,
    Username: username,
  };

  console.log(`Attempting to add ${username} to ${groupname}`);

  try {
    const result = await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
    console.log(`Success adding ${username} to ${groupname}`);
    return {
      message: `Success adding ${username} to ${groupname}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function removeUserFromGroup(username, groupname) {
  const params = {
    GroupName: groupname,
    UserPoolId: userPoolId,
    Username: username,
  };

  console.log(`Attempting to remove ${username} from ${groupname}`);

  try {
    const result = await cognitoIdentityServiceProvider.adminRemoveUserFromGroup(params).promise();
    console.log(`Removed ${username} from ${groupname}`);
    return {
      message: `Removed ${username} from ${groupname}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Confirms as an admin without using a confirmation code.
async function confirmUserSignUp(username) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  try {
    const result = await cognitoIdentityServiceProvider.adminConfirmSignUp(params).promise();
    console.log(`Confirmed ${username} registration`);
    return {
      message: `Confirmed ${username} registration`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function disableUser(username) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  try {
    const result = await cognitoIdentityServiceProvider.adminDisableUser(params).promise();
    console.log(`Disabled ${username}`);
    return {
      message: `Disabled ${username}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function enableUser(username) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  try {
    const result = await cognitoIdentityServiceProvider.adminEnableUser(params).promise();
    console.log(`Enabled ${username}`);
    return {
      message: `Enabled ${username}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getUser(username) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  console.log(`Attempting to retrieve information for ${username}`);

  try {
    const result = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function listUsers(Limit, PaginationToken) {
  const params = {
    UserPoolId: userPoolId,
    ...(Limit && { Limit }),
    ...(PaginationToken && { PaginationToken }),
  };

  console.log("Attempting to list users");

  try {
    const result = await cognitoIdentityServiceProvider.listUsers(params).promise();

    // Rename to NextToken for consistency with other Cognito APIs
    result.NextToken = result.PaginationToken;
    delete result.PaginationToken;

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function listGroups(Limit, PaginationToken) {
  const params = {
    UserPoolId: userPoolId,
    ...(Limit && { Limit }),
    ...(PaginationToken && { PaginationToken }),
  };

  console.log("Attempting to list groups");

  try {
    const result = await cognitoIdentityServiceProvider.listGroups(params).promise();

    // Rename to NextToken for consistency with other Cognito APIs
    result.NextToken = result.PaginationToken;
    delete result.PaginationToken;

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function listGroupsForUser(username, Limit, NextToken) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
    ...(Limit && { Limit }),
    ...(NextToken && { NextToken }),
  };

  console.log(`Attempting to list groups for ${username}`);

  try {
    const result = await cognitoIdentityServiceProvider.adminListGroupsForUser(params).promise();
    /**
     * We are filtering out the results that seem to be innapropriate for client applications
     * to prevent any informaiton disclosure. Customers can modify if they have the need.
     */
    result.Groups.forEach((val) => {
      delete val.UserPoolId,
        delete val.LastModifiedDate,
        delete val.CreationDate,
        delete val.Precedence,
        delete val.RoleArn;
    });

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function listUsersInGroup(groupname, Limit, NextToken) {
  const params = {
    GroupName: groupname,
    UserPoolId: userPoolId,
    ...(Limit && { Limit }),
    ...(NextToken && { NextToken }),
  };

  console.log(`Attempting to list users in group ${groupname}`);

  try {
    const result = await cognitoIdentityServiceProvider.listUsersInGroup(params).promise();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Signs out from all devices, as an administrator.
async function signUserOut(username) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  console.log(`Attempting to signout ${username}`);

  try {
    const result = await cognitoIdentityServiceProvider.adminUserGlobalSignOut(params).promise();
    console.log(`Signed out ${username} from all devices`);
    return {
      message: `Signed out ${username} from all devices`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateUserInfo(username, email, firstName, lastName, note, clientID) {
  const attrParams = [
    {
      Name: "email",
      Value: email,
    },
    {
      Name: "custom:firstName",
      Value: firstName,
    },
    {
      Name: "custom:lastName",
      Value: lastName,
    },
    {
      Name: "custom:note",
      Value: note,
    },
  ];
  if (clientID) {
    attrParams.push({ Name: "custom:clientID", Value: clientID });
  }
  const params = {
    UserPoolId: userPoolId,
    Username: username,
    UserAttributes: attrParams,
  };

  try {
    const result = await cognitoIdentityServiceProvider.adminUpdateUserAttributes(params).promise();
    return {
      message: `Success updating ${result}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateAssociatedData(username, note) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
    UserAttributes: [
      {
        Name: "custom:note",
        Value: note,
      },
    ],
  };

  try {
    const result = await cognitoIdentityServiceProvider.adminUpdateUserAttributes(params).promise();
    return {
      message: `Success updating ${result}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateUserPassword(username, password) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
    Password: password,
    Permanent: true,
  };

  try {
    const result = await cognitoIdentityServiceProvider.adminSetUserPassword(params).promise();
    return {
      message: `Success updating ${result}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteUser(username) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  try {
    const result = await cognitoIdentityServiceProvider.adminDeleteUser(params).promise();
    return {
      message: `Success updating ${result}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
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
};
