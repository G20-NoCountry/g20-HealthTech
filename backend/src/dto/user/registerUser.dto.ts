export class RegisterUserDto {
  constructor(
    public first_name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public rol: "medico" | "paciente",
    public phone: string
  ) {}
}
