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
  req.body = {}

  busboy.on('field', (key, val) => {
    req.body[key] = val
  })

  busboy.on('file', (key, file) => {

    uploadingFile = true
    uploadingCount++

    const stream = cloudinary.v2.uploader.upload_stream(
      undefined,
      (err, res) => {
        if (err) throw new Error('Something went wrong!')

        req.body[key] = res
        uploadingCount--
        uploadingFile = uploadingCount === 0 ? false : true 
        done()
      }
    )

    file.on('data', data => {
      stream.write(data)
    })

    file.on('end', () => {
      stream.end()
    })
  })

  busboy.on('finish', () => {
    done()
  })

  req.pipe(busboy)
}
