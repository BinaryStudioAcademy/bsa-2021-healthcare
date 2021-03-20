import { Router } from 'express';
import { ApiPath, ImagesApiPath, HttpCode } from '~/common/enums';
import { uploadFileService } from '~/services/services';
import multer from 'multer';

const initImageApi = (apiRouter: Router): Router => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage,
  });
  const imageRouter = Router();

  apiRouter.use(ApiPath.IMAGES, imageRouter);

  imageRouter.post(ImagesApiPath.ROOT, upload.single('image'), async (req, res, next) => {
    try {
      const result = await uploadFileService.uploadImage(req.file);
      res.status(HttpCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  });

  return imageRouter;
};

export { initImageApi };