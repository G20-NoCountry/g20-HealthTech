"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = void 0;
class RegisterUserDto {
    constructor(first_name, last_name, email, password, rol, phone) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.phone = phone;
    }
}
exports.RegisterUserDto = RegisterUserDto;
