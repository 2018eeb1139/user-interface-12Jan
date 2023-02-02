import axios from "axios";

const API_URL = "http://10.198.186.68:6116/api/business/";

const getbyid = (businessRule, userentity, user, id) => {
  return axios.post(API_URL + "gethistorybyid", {
        businessrule: businessRule,
        entity: userentity,
        requester: user,
        recordid: id,
  });
};

const getDatabyid = {
  getbyid,
}

export default getDatabyid;