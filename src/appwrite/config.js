import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite"

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.AppwriteUrl)
            .setProject(conf.AppwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, userId, status }) {
        try {
            return await this.databases.createDocument(
                conf.AppwriteDatabaseId,
                conf.AppwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status
                }
            )
        } catch (error) {
             console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.AppwriteDatabaseId,
                conf.AppwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service:: updatePost::error", error);
        }
    }

    async DeletePost(slug) {
        try {
             await this.databases.deleteDocument(
                conf.AppwriteDatabaseId,
                conf.AppwriteCollectionId,
                slug
              
            )
            return true
        } catch (error) {
            console.log("Appwrite service:: DeletePost::error", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.AppwriteDatabaseId,
                conf.AppwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service:: getPost::error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.AppwriteDatabaseId,
                conf.AppwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service:: getPosts::error", error);
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.AppwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service::uploadfile::error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(
                conf.AppwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service::Deletefile::error", error);
            return false;
        }
    }
    
    getFilePreview(fileId){
        return this.bucket.getFileView(
            conf.AppwriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service;