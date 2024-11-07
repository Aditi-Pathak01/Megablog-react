import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, content, featuredImg, slug, userId, status }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImg, userId, status }
      );
    } catch (err) {
      console.log("err in create Post in config.js");
    }
  }

  async updatePost(slug, { title, content, featuredImg, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId
        {
          title,
          content,
          featuredImg,
          status,
        }
      );
    } catch (err) {
      console.log("err in updateDoc");
    }
  }

  async dltPost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug
      );
      return true;
    } catch (err) {
      console.log("dltDoc err in config.js");
      return false;
    }
  }
  async getPost(slug) {
    try {
      await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (err) {
      console.log("err in the getPost");
      return false;
    }
  }

  async getAllActivePosts(queries = [Query.equal("status", "active")]) {
    try {
      return this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (err) {
      console.log("getAllActivePost err :: in appwrite Service");
      return false;
    }
  }

  //file upload service  : storage/bucket
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (err) {
      console.log("err in uplioad file service !");
      return false;
    }
  }
  //file deleteFile service  : storage/bucket
  async dltFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (err) {
      console.log(err, "err in dlt file service !");
      return false;
    }
  }
  //getFilePrev service  : storage/bucket
  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}
const service = new Service();
export default service;
/**import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
/**
 * 
 * 
 */