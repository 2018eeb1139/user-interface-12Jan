import axios from "axios";

const API_URL = "http://10.198.186.68:6116/api/business/";

const createDC = (businessRule, userentity, user, curr, createTS, issueTo, issueBy, Owner, TS, valid, token) => {
  return axios.post(API_URL + "create", {
        businessrule: businessRule,
        entity: userentity,
        requester: user,
        currency: curr,
        createdtimestamp: createTS,
        issuedbyentity: issueTo,
        issuedtoentity: issueBy,
        owner: Owner,
        timestamp: TS,
        validuntil:valid,
        value: token,
  });
};

const createdc = {
  createDC,
}
export default createdc;