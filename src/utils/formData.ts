import Busboy from 'busboy'
import cloudinary from 'cloudinary'
import { Request, Response, NextFunction } from 'express'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function formData (req: Request, res: Response, next: NextFunction): Promise<void> {
  
  let uploadingFile = false
  let uploadingCount = 0

  function done() {
    if (uploadingFile) return;
    if (uploadingCount > 0) return;

    next()
  }

  const busboy = new Busboy({ headers: req.headers })
  //console.log('busboy', busboy)
  req.body = {}

  busboy.on('field', (key, val) => {
    //console.log('key, val', key, val)
    req.body[key] = val
  })

  busboy.on('file', (key, file) => {

    console.log('key, file', key, file)
    uploadingFile = true
    uploadingCount++

    const stream = cloudinary.v2.uploader.upload_stream(
      undefined,
      (err, res) => {
        if (err) throw new Error('Something went wrong!')

        req.body[key] = res
        uploadingFile = false
        uploadingCount--
        done()
      }
    )

    file.on('data', data => {
      //console.log('data', data)
      stream.write(data)
    })

    file.on('end', () => {
      //console.log('finish')
      stream.end()
    })
  })

  busboy.on('finish', () => {
    done()
  })

  req.pipe(busboy)
}
