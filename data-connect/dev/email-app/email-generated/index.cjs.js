const { getDataConnect, queryRef, mutationRef, executeQuery, executeMutation } = require('firebase/data-connect');


exports.connectorConfig = {
  connector: 'email',
  service: 'local',
  location: 'us-central1'
};


exports.createUserRef = function createUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}


exports.createEmailRef = function createEmailRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'CreateEmail', inputVars);
}
exports.createEmail = function createEmail(dcOrVars, vars) {
  return executeMutation(createEmailRef(dcOrVars, vars));
}


exports.createRecipientRef = function createRecipientRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'CreateRecipient', inputVars);
}
exports.createRecipient = function createRecipient(dcOrVars, vars) {
  return executeMutation(createRecipientRef(dcOrVars, vars));
}


exports.deleteEmailRef = function deleteEmailRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'DeleteEmail', inputVars);
}
exports.deleteEmail = function deleteEmail(dcOrVars, vars) {
  return executeMutation(deleteEmailRef(dcOrVars, vars));
}


exports.listUsersRef = function listUsersRef(dc) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dc, undefined);
  return queryRef(dcInstance, 'ListUsers');
}
exports.listUsers = function listUsers(dc) {
  return executeQuery(listUsersRef(dc));
}


exports.getUidByEmailRef = function getUidByEmailRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars, true);
  return queryRef(dcInstance, 'GetUidByEmail', inputVars);
}
exports.getUidByEmail = function getUidByEmail(dcOrVars, vars) {
  return executeQuery(getUidByEmailRef(dcOrVars, vars));
}


exports.listInboxRef = function listInboxRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return queryRef(dcInstance, 'ListInbox', inputVars);
}
exports.listInbox = function listInbox(dcOrVars, vars) {
  return executeQuery(listInboxRef(dcOrVars, vars));
}


exports.listSentRef = function listSentRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return queryRef(dcInstance, 'ListSent', inputVars);
}
exports.listSent = function listSent(dcOrVars, vars) {
  return executeQuery(listSentRef(dcOrVars, vars));
}



function validateArgs(dcOrVars, vars, validateVars) {
  let dcInstance;
  let realVars;
  // TODO; Check what happens if this is undefined.
  if(dcOrVars && 'dataConnectOptions' in dcOrVars) {
      dcInstance = dcOrVars;
      realVars = vars;
  } else {
      dcInstance = getDataConnect(connectorConfig);
      realVars = dcOrVars;
  }
  if(!dcInstance || (!realVars && validateVars)) {
      throw new Error('You didn\t pass in the vars!');
  }
  return { dc: dcInstance, vars: realVars };
}