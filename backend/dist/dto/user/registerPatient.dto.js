"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterPatientDto = void 0;
const registerUser_dto_1 = require("./registerUser.dto");
class RegisterPatientDto extends registerUser_dto_1.RegisterUserDto {
    constructor(first_name, last_name, email, password, rol, phone, id_health_insurance, blood_type, alergias, cronicas_condition, actual_medication, location) {
        super(first_name, last_name, email, password, rol, phone);
        this.id_health_insurance = id_health_insurance;
        this.blood_type = blood_type;
        this.alergias = alergias;
        this.cronicas_condition = cronicas_condition;
        this.actual_medication = actual_medication;
        this.location = location;
    }
}
exports.RegisterPatientDto = RegisterPatientDto;
