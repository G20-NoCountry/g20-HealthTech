"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = require("bcrypt");
const models_1 = require("../models");
class UserService {
    registerUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.createUser(dto);
                if (newUser) {
                    const newUserByRole = this.createUserByRole(newUser.id, dto);
                    if (!newUserByRole) {
                        throw new Error("Error en registro");
                    }
                    return newUserByRole;
                }
                return newUser;
            }
            catch (error) {
                return null;
            }
        });
    }
    createUserByRole(userId, dto) {
        if ("id_health_insurance" in dto) {
            const newPatient = this.createPatient(userId, dto);
            return newPatient;
        }
        const newMedic = this.createMedic(userId, dto);
        return newMedic;
    }
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            dto.password = (0, bcrypt_1.hashSync)(dto.password, 10);
            const user = models_1.User.build({
                first_name: dto.first_name,
                last_name: dto.last_name,
                email: dto.email,
                password: dto.password,
                rol: dto.rol,
                phone: (_a = dto.phone) !== null && _a !== void 0 ? _a : null,
            });
            yield user.save();
            return user;
        });
    }
    createPatient(userId, dto) {
        const patient = models_1.Patient.build({
            id: userId,
            id_health_insurance: dto.id_health_insurance,
            blood_type: dto.blood_type,
            alergias: dto.alergias,
            cronicas_condition: dto.cronicas_condition,
            actual_medication: dto.actual_medication,
            location: dto.location,
        });
        patient.save();
        return patient;
    }
    createMedic(userId, dto) {
        const medic = models_1.Medic.build({
            id: userId,
            specialty: dto.specialty,
            licence_num: dto.licence_num,
            schedule_from: dto.schedule_from,
            schedule_at: dto.schedule_at,
        });
        medic.save();
        return medic;
    }
}
exports.UserService = UserService;
