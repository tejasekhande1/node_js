const { File } = require('../models/File')
const cloudinary = require('cloudinary').v2

function isFileTypeSupported(fileType) {
    const supportedTypes = ["jpg", "jpeg", "png", "mp4", "mov"];
    return supportedTypes.includes(fileType)
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder }
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    console.log("Options -> ", options)
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files.image

        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType)) {
            return res.status(400).json({
                success: false,
                message: "File Format Not Supported",
                error: error
            })
        }

        const response = await uploadFileToCloudinary(file, "Codehelp", 100)
        console.log("response -> ", response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        return res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "file uploaaded successfully",
        })

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Error in file uploading in cloudinary",
            error: error
        })
    }
}

exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files.videoFile

        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType)) {
            return res.status(400).json({
                success: false,
                message: "File Format Not Supported",
                error: error
            })
        }

        const response = await uploadFileToCloudinary(file, "Codehelp")

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        return res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "file uploaaded successfully",
        })

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Error in file uploading video in cloudinary",
            error: error
        })
    }
}

exports.imageReducerUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files.image

        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType)) {
            return res.status(400).json({
                success: false,
                message: "File Format Not Supported",
                error: error
            })
        }

        const response = await uploadFileToCloudinary(file, "Codehelp", 50)

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        return res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "file uploaaded successfully",
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Error in file uploading video in cloudinary",
            error: error
        })
    }
}

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("File -> ", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`

        console.log("PATH -> ", path);

        file.mv(path, (err) => {
            console.log(err);
        })

        res.json({
            success: true,
            message: "File Uploaded Successfully",
        })

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Error in file uploading in local",
            error: error
        })
    }
}