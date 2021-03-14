const config = require('../../config');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const gm = require('gm').subClass({ imageMagick: true });

function crop(path, width, height, newpath) {
  return new Promise(resolve => {
    gm(path)
      .gravity('Center')
      .resize(width, null) // Move the starting point to the center of the image.
      .crop(width, height)
      .write(newpath, (err) => {
        if (err) {
          resolve(false, err);
          console.error('no croped', err);
        } else {
          resolve(true);
        }
      })
  });
}

exports.upload = (req, res) => {
  // after the file is uploaded i'll move it to the destination path provided by the frontend
  // files stays in 'temp' folder if has not a req.body.folder

  console.log("req.file",req.file)
  
  if (req.body.folder && req.file) {

    // check if folder exists and create it if needed
    let destFolder = `${config.uploadPath}/${req.body.folder}`;
    if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder);

    const names = req.file.originalname.split('.');
    const extension = names[names.length - 1];
    const fileName = `${req.file.filename}.${extension}`;

    // move file to folder
    fs.renameSync(req.file.path, `${destFolder}/${fileName}`);

    res.json({
      file: {
        size: req.file.size,
        filename: fileName,
        mimetype: req.file.mimetype,
        encoding: req.file.encoding,
        originalname: req.file.originalname,
        destinationFolder: req.body.folder || 'temp'
      }
    });
  } else {
    res.json({
      success: false,
      err: 'Não foi possivel salvar o arquivo'
    });
  }
};

exports.uploads = async (req, res) => {
  console.log("req.files",req.files)
  if (req.body.folder && req.files.length > 0) {

    const retorno = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      // check if folder exists and create it if needed
      let destFolder = `${config.uploadPath}/${req.body.folder}`;
      if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder);
  
      const names = file.originalname.split('.');
      const extension = names[names.length - 1];
      const fileName = `${file.filename}.${extension}`;
  
      // move file to folder
      fs.renameSync(file.path, `${destFolder}/${fileName}`);

      await crop(`${destFolder}/${fileName}`, 800, 600, `${destFolder}/800_600_${fileName}`)
      await crop(`${destFolder}/${fileName}`, 400, 400, `${destFolder}/400_300_${fileName}`)
      await crop(`${destFolder}/${fileName}`, 200, 350, `${destFolder}/200_350_${fileName}`)

      retorno.push({
        size: file.size,
        filename: fileName,
        mimetype: file.mimetype,
        encoding: file.encoding,
        originalname: file.originalname,
        destinationFolder: req.body.folder
      });
    }

    res.json({
      files: retorno
    });
  } else {
    res.json({
      success: false,
      err: 'Não foi possivel salvar o arquivo'
    });
  }
};

exports.getFile = async (req, res) => {
  res.setHeader('Content-Type', req.query.mimetype);

  if (req.query.mimetype && req.query.filename) {
    const pathImg = path.join(`${config.uploadPath}/${req.query.folder}`, req.query.filename);
    const exist = await fs.existsSync(pathImg);

    if (exist) {
      fs.createReadStream(pathImg).pipe(res);
    } else {
      res.end();
    }
  } else {
    res.end();
  }
};

exports.base64 = async (req, res) => {
  const regex = req.body.base64.match(/data:(.*\/.*);base64,(.*)/);

  if (regex.length === 3) {
    const ext = mime.extension(regex[1]);
    const dest = path.join(`${config.uploadPath}/${req.body.folder}`, `${req.body.idPage}.${ext}`);

    try {
      fs.writeFileSync(dest, regex[2], 'base64');
    } catch (error) {
      return res.json({
        success: false,
        err: 'Não foi possivel salvar o arquivo',
        errC: error.toString()
      });
    }

    return res.json({
      file: {
        filename: `${req.body.idPage}.${ext}`,
        mimetype: regex[1],
        destinationFolder: req.body.folder || 'temp'
      }
    });
  } else {
    return res.json({
      success: false,
      err: 'Não foi possivel salvar o arquivo'
    });
  }
};
