import { UpdateUserDto } from "../user/updateUser.dto";

export class UpdateMedicDto extends UpdateUserDto {
  constructor(
    id: number,
    first_name?: string,
    last_name?: string,
    email?: string,
    phone?: string,
    public license_num?: number
  ) {
    super(id, first_name, last_name, email, phone);
  }
}
