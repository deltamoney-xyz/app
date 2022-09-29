import initializeBasicAuth from "nextjs-basic-auth";

const users = [{ user: "dm", password: "dmxyz" }];

export default initializeBasicAuth({
  users: users,
});
