import { Router } from 'express';
import { ApiPath, HttpCode, AppointmentsApiPath } from '~/common/enums';
import { appointment } from '~/services/services';
 
const initAppointmentApi = (apiRouter: Router): Router => {
  const appointmentRouter = Router();

  apiRouter.use(ApiPath.APPOINTMENTS, appointmentRouter);

  appointmentRouter.post(AppointmentsApiPath.ROOT, async (req, res, next) => {
    try {        
      const appointmentData = await appointment.create(req.body);
      res.status(HttpCode.OK).json(appointmentData);
    } catch(error) {
      next(error);
    }
  });

  return appointmentRouter;
};

export { initAppointmentApi };
