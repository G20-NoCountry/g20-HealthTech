import { UpdateUserDto } from "../user/updateUser.dto";

export class UpdatePatientDto extends UpdateUserDto {
  constructor(
    id: number,
    first_name?: string,
    last_name?: string,
    email?: string,
    phone?: string,
    public id_health_insurance?: number,
    public blood_type?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-",
    public alergias?: string,
    public cronicas_condition?: string,
    public actual_medication?: string,
    public location?: string
  ) {
    super(id, first_name, last_name, email, phone);
  }
}
