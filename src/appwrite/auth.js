//vip vip copy paste from here //
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAcc({ email, password, name }) {
    //create acc//signUp
    try {
      const userAcc = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAcc) {
        return this.login({ email, password });
      } else {
        return userAcc;
      }
    } catch (err) {
      console.log("userAcc not found");
    }
  }

  async login({ email, password }) {
    //login
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (err) {
      console.log("login err");
    }
  }

  async getCurrUser() {
    // user data
    try {
      return await this.account.get();
    } catch (err) {
      console.log("no user found");
    }
    return null;
  }

  async logout() {
    //logout fx
    try {
      return await this.account.deleteSessions();
    } catch (err) {
      console.log("loggedOut");
    }
  }
}
const authService = new Authservice();
export default authService;

/** } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } */