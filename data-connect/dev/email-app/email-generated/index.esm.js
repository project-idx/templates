/*
  Copyright 2024 Google LLC
  
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.  
  
  You may obtain a copy of the License at
  
   https://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed  
  under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing  
  permissions and
  limitations under the License.
*/
import { getDataConnect, queryRef, mutationRef, executeQuery, executeMutation } from 'firebase/data-connect';


export const connectorConfig = {
  connector: 'email',
  service: 'local',
  location: 'us-central1'
};


export function createUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}



export function createEmailRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'CreateEmail', inputVars);
}
export function createEmail(dcOrVars, vars) {
  return executeMutation(createEmailRef(dcOrVars, vars));
}



export function createRecipientRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'CreateRecipient', inputVars);
}
export function createRecipient(dcOrVars, vars) {
  return executeMutation(createRecipientRef(dcOrVars, vars));
}



export function deleteEmailRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'DeleteEmail', inputVars);
}
export function deleteEmail(dcOrVars, vars) {
  return executeMutation(deleteEmailRef(dcOrVars, vars));
}



export function listUsersRef(dc) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dc, undefined);
  return queryRef(dcInstance, 'ListUsers');
}
export function listUsers(dc) {
  return executeQuery(listUsersRef(dc));
}



export function getUidByEmailRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars, true);
  return queryRef(dcInstance, 'GetUidByEmail', inputVars);
}
export function getUidByEmail(dcOrVars, vars) {
  return executeQuery(getUidByEmailRef(dcOrVars, vars));
}



export function listInboxRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return queryRef(dcInstance, 'ListInbox', inputVars);
}
export function listInbox(dcOrVars, vars) {
  return executeQuery(listInboxRef(dcOrVars, vars));
}



export function listSentRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return queryRef(dcInstance, 'ListSent', inputVars);
}
export function listSent(dcOrVars, vars) {
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
