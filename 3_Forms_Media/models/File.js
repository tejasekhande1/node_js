const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
})

fileSchema.post("save", async (doc) => {
    try {

        // shift configuration under config
        let transporter = nodemailer.createTransport({
            host: 2700,
            auth: {
                user: "tejas@gmail.com",
                password: "tejas"
            }
        })

        let info = await transporter.sendMail({
            from: 'codehelp',
            to: doc.email,
            subject: 'New File Uploaded on Cloudinary',
            html: `<h2> File uploaded</h2>`
        })

    } catch (error) {
        console.error(error)
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File