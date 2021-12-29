import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../utils/db';
import ErrorHandler from '../../../utils/ErrorHandler';
import multer from 'multer';
import sharp from 'sharp';
import initMiddleware from '../../../utils/middleware';

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('not an image please upload an image'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

const uploadPicture = initMiddleware(upload.single('photo'));

type NextApiRequestWithFormData = NextApiRequest & {
  file: any;
};

export const config = {
  api: {
    bodyParser: false
  }
};

const handler = async (
  req: NextApiRequestWithFormData,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    try {
      const session = getSession({ req });

      if (!session) throw new Error('please login');

      const id = new ObjectId(req.query.id.toString());

      await uploadPicture(req, res);

      if (!req.file) return new Error('please select an image');

      const filename = `user-${req.query.id.toString()}.jpg`;

      sharp(req.file.buffer)
        .rotate(90)
        .resize(200, 200, { position: 'top' })
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/avatar/${filename}`);

      const { db } = await connectToDatabase();

      await db
        .collection('users')
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: { photo: filename } },
          { bypassDocumentValidation: true }
        );

      res.status(200).json({
        status: 'success'
      });
    } catch (err) {
      const message = ErrorHandler(err);

      res.status(400).json({
        status: 'error',
        error: message
      });
    }
  }
};

export default handler;
