import { RegisterUserDto } from "./registerUser.dto";

export class RegisterMedicDto extends RegisterUserDto {
  constructor(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    rol: "medico" | "paciente",
    phone: string,
    public speciality:
      | "oftalmologia"
      | "cardiologia"
      | "neurologia"
      | "dermatologia"
      | "pediatria"
      | "ginecologia"
      | "traumatologia"
      | "psiquiatria"
      | "medicina_general",
    public licence_num: number,
    public schedule_at: Date
  ) {
    super(first_name, last_name, email, password, rol, phone);
  }
}
