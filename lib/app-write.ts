
import { Account, Avatars, Client, Databases, ID, Query, Storage, ImageGravity } from 'react-native-appwrite';

const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: 'com.jsm.aora',
    projectId: "6671d9c1001efed68abe",
    databaseId: "6671f1e000328b8fa836",
    usersCollectionId: "6671f21200131fb1f025",
    videosCollectionId: "6671f23b001485a2ec68",
    storageId: "6671f42d000b1af36159",
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

const createUser = async (email:string, password:string, username:string) => {
    try {
        email = email.trim().toLowerCase();
        username = username.trim();
        password = password.trim();

        const randomString = Math.random().toString(36).substring(2, 15);

        // Combine username and random string to create user ID
        const userId = `${username.replace(/[^a-zA-Z0-9.-_]/g, "").toLowerCase()}_${randomString}`
        const createdAccount = await account.create(
            userId,
            email,
            password,
            username
        );

        if( !createdAccount ) 
            throw new Error("User not created");

        const avatarUrl = await avatars.getInitials(username);
        
        await signIn(email, password);
        
        const newUser = await databases.createDocument(
            config.databaseId,
            config.usersCollectionId,
            ID.unique(),
            {
                accountId: createdAccount.$id,
                username,
                email,
                avatar: avatarUrl,
            }
        );

        return newUser; 
    } catch (error) {
        console.log(error);
    }
}

const signIn = async (email:string, password:string) => {
    try{
        email = email.trim()
        password = password.trim()
        const session = await account.createEmailPasswordSession(email, password);
        if(session){
            account
        }
        return session;
    } catch(error){
        throw error;
    }
}

const getLoggedInUser = async () => {
    try {
        const currentAccount = await account.get();
        
        if( !currentAccount ) throw new Error("User not found");

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.usersCollectionId,
            [Query.equal("accountId", currentAccount.$id)],
        );

        if( !currentUser ) throw new Error("User not found");

        return currentUser.documents[0]; 

    } catch (error) {
        throw error;
    }
}

const getVideos = async () => {
    try {
        const videos = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [
                Query.orderDesc('$createdAt')
            ]
        );

        return videos.documents;
    } catch (error) {
        throw error;
    }
}

const getLatestVideos = async () => {
    try {
        const videos = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(7),
            ],
        );

        return videos.documents;
    } catch (error) {
        throw error;
    }
}

const searchVideos = async (query:string) => {
    try {
        const videos = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [
                Query.search('title', query)
            ],
        );

        return videos.documents;
    } catch (error) {
        console.log("🚀 ~ searchVideos ~ error:", error)
        throw error;
    }
}

const getUserVideos = async (userId: string) => {
    try {
        const videos = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [
                Query.equal("creators", userId),
                Query.orderDesc('$createdAt'),
            ]
        );

        return videos.documents;
    } catch (error) {
        throw error;
    }
}

const logUserOut = async () => {
    try {
        await account.deleteSession("current");
        return;      
    } catch (error) {
        throw error;
    }

}

const getFilePreview = (fileType: 'image' | 'video', fileId:string) => {

    let fileUrl;

    try {

        if(fileType === "image"){
            fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, ImageGravity.Top, 100);
        } else if(fileType === "video"){
            fileUrl = storage.getFileView(config.storageId, fileId);
        } else {
            throw new Error("Invalid file type");
        }
        
        if(!fileUrl) throw new Error("File not found");

        return fileUrl;
    
    } catch(error){
        console.log("🚀 ~ getFilePreview ~ error:", JSON.stringify(error, null, 2))
        throw error;
    }
}

const uploadFile = async (file:any, type:string) => {
    if(!file) return;
    
    // console.log(JSON.stringify({
    //     file,
    //     type,
    // }, null, 2));

    const storedFile = await storage.createFile(
        config.storageId,
        ID.unique(),
        {
            name: file.fileName,
            type: file.mimeType,
            size: file.fileSize,
            uri: file.uri,
        }
    );

    return getFilePreview(type as any, storedFile.$id);
}

const createVideo = async (form: any) => {
    console.log(JSON.stringify(form, null, 2));
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "image"),
        ]);

        console.log(JSON.stringify({
            thumbnailUrl,
            videoUrl,
        }, null, 2));

        const newVideo = await databases.createDocument(
            config.databaseId,
            config.videosCollectionId,
            ID.unique(),
            {
                title: form.title,
                prompt: form.prompt,
                thumpnail: thumbnailUrl,
                video: videoUrl,
                creators: form.userId,
            }
        );

        return newVideo;
    } catch (error) {
        console.log("🚀 ~ getFilePreview ~ error:", JSON.stringify(error, null, 2))
        throw error;
    }
}

export {
    config,
    createUser,
    signIn,
    getLoggedInUser,
    getVideos,
    getLatestVideos,
    logUserOut,
    searchVideos,
    getUserVideos,
    createVideo,
}