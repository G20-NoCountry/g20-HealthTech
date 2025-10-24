"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterMedicDto = void 0;
const registerUser_dto_1 = require("./registerUser.dto");
class RegisterMedicDto extends registerUser_dto_1.RegisterUserDto {
    constructor(first_name, last_name, email, password, rol, phone, specialty, licence_num, schedule_from, schedule_at) {
        super(first_name, last_name, email, password, rol, phone);
        this.specialty = specialty;
        this.licence_num = licence_num;
        this.schedule_from = schedule_from;
        this.schedule_at = schedule_at;
    }
}
exports.RegisterMedicDto = RegisterMedicDto;
