// require = require("esm")(module);
import bcrypt from "bcrypt";
let salt = bcrypt.genSaltSync(10);

export default {
  encryptText: async (pass: any) => {
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
  },

  //function to decrypt_password or ant text
  decryptText: async (pass: any, hash: any) => {
    const is_compared = bcrypt.compareSync(pass, hash);
    return is_compared;
  },
};
