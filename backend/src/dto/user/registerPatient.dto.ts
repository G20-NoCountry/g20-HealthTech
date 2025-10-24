import { RegisterUserDto } from "./registerUser.dto";

export class RegisterPatientDto extends RegisterUserDto {
  constructor(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    rol: "medico" | "paciente",
    phone: string,
    public health_insurance:
      | "OSECAC"
      | "OSPRERA"
      | "UPCN"
      | "OBSBA"
      | "OSDEPYM"
      | "OSUTHGRA"
      | "OSPE"
      | "OSPECON"
      | "OSIAD"
      | "OSSEG",
    public blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-",
    public alergias: string,
    public cronicas_condition: string,
    public actual_medication: string,
    public location: string
  ) {
    super(first_name, last_name, email, password, rol, phone);
  }
}
