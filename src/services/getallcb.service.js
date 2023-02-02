import axios from "axios";

const API_URL = "http://10.198.186.68:6116/api/business/";

const getallCB = (businessRule, userentity, user) => {
  return axios.post(API_URL + "getallrecords", {
    businessrule: businessRule, 
    entity: userentity, 
    requester: user,
  });
};

const getall = {
  getallCB,
}
export default getall;