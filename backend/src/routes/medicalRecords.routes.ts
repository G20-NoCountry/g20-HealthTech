import { Router } from 'express';
import { MedicalRecordController } from '../controllers/medicalRecord.controller';
import { isAdmin } from '../middlewares/auth/admin.middleware';
import { patientIdValidator } from '../validators/param/patientId.validator';
import { isAuthenticated } from '../middlewares/auth/authenticated.middleware';
import { canAccessMedic } from '../middlewares/user/canAccessMedic.middleware';

const router = Router();
const medicalRecordController = new MedicalRecordController;
router.use(isAuthenticated);

//$ [FIX] - Solo médicos pueden acceder a los historiales médicos??.
router.get('/medical_records/:patient_id', canAccessMedic, patientIdValidator, medicalRecordController.getMedicalRecord);

export default router;