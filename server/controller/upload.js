// const multerHelper = require("../middleware/multer");
// const dataUri = multerHelper.dataUri;
// const { v2, cloudinaryConfig } = require("../config/cloudinary");
// const upload = (req, res, next) => {
//   if (req.file) {
//     console.log(req.file);
//     const file = dataUri(req).content;
//     return v2.uploader
//       .upload(file, {
//         resource_type: "auto"
//       })
//       .then(result => {
//             console.log('upload.js ',result);

//         const fileUploadedUrl = result.url;
//         let originalName = req.file.originalname;
//         res.locals["originalName"] = originalName;
//         res.locals["cloudinaryUrl"] = fileUploadedUrl;
//         next();
//       })
//       .catch(err => {
//             console.log('upload.js fail',err);

//         res.status(400).json({
//           message: "Something went wrong while processing your request",
//           success: false,
//           data: {
//             err
//           }
//         });
//       });
//   } else {
//     console.log(false);
//   }
// };
const uuidv1 = require('uuid/v1')
let temp = []

const data = {
  upload (req, res, next) {
    // console.log("Files", req.files);
    if (req.files) {
      
      const files = [...req.files];
      files.forEach(file => {
        let file_upload = {
          id : uuidv1(),
          originalName: file.originalname,
          awsUrl: file.location,
        }
        temp.push(file_upload)
      })
  
      res.locals = temp;
      next()
      console.log(res.locals);
    } else {
      res.json({
        message: "Null"
      });
    }
  },
  
  del (req, res) {
    const id = req.params.id;

    temp.forEach(temp => {
      if(id !== temp.id){
           return res.status(400).json({
            message: `file with id ${id} does not exist`
          })
        }
    })
    
  
    const newTemp = temp.filter(temp => temp.id !== id)
  
    temp = newTemp;
     res.status(200).json({
      status: 'success',
      message: 'deleted successfully'
    })
  }
}


module.exports = data;