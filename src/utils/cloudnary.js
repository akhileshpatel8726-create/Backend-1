import {v2 as cloudinary} from "cloudinary";
import fs from "fs"

 // Configuration
    cloudinary.config({ 
        cloud_name: Process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_SPI_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadOnCloudinary = async(localFilePath) =>{
        try {
            if(!localFilePath) return null
            const  response = await cloudinary.uploader.upload(localFilePath, {
                resource_type:"auto"
            })
            //file has been uploaded seuccesfull
            console.log("upload file sucees on cloudinary",
                response.url
            );
            return response;

        } catch (error) {
            fs.unlinkSync(localFilePath)//remove the locally saved temprory file as the upload operation got failes
            return null;
        }
    }


    export {uploadOnCloudinary}