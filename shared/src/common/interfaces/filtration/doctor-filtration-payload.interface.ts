import { DoctorFiltration, DoctorType, ClinicType } from '~/common/enums';

interface IDoctorFiltrationPayload {
  [DoctorFiltration.SEARCH_BY_DOCTOR_NAME]: string;
  [DoctorFiltration.CITY]: string;
  [DoctorFiltration.SPECIALTY]: DoctorType[];
  [DoctorFiltration.TYPE_OF_CLINIC]: ClinicType;
}

export type { IDoctorFiltrationPayload };
