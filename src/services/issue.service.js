import axios from "axios";

const API_URL = "http://10.198.186.68:6116/api/business/";

const issueDC = (businessRule, userentity, user, token, issueTo, Owner, amount, TS) => {
  return axios.post(API_URL + "issue", {
        businessrule: businessRule,
        entity: userentity,
        requester: user,
        value: token,
        owner: Owner,
        issueto: issueTo,
        quantity: amount,
        time: TS,
  });
};

const issuedc = {
  issueDC,
}
export default issuedc;