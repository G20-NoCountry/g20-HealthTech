import { Router } from 'express';
import { MedicalRecordController } from '../controllers/medicalRecord.controller';
import { isAdmin } from '../middlewares/auth/admin.middleware';
import { patientIdValidator } from '../validators/param/patientId.validator';

const router = Router();
const medicalRecordController = new MedicalRecordController;

router.get('/medical_records/:patient_id', patientIdValidator, isAdmin, medicalRecordController.getMedicalRecord);

export default router;