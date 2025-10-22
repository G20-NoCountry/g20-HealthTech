export class RegisterUserDto {
    constructor(
        public first_name: string,
        public last_name: string,
        public email: string,
        public password: string,
        public role_id: number,
        public phone: string,
    ) { }
}