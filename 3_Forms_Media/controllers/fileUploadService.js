const { File } = require('../models/File')

exports.imageUpload = async (req, res) => {

}

exports.videoUpload = async (req, res) => {

}

exports.imageReducerUpload = async (req, res) => {

}

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("File -> ", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`

        console.log("PATH -> ",path);

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