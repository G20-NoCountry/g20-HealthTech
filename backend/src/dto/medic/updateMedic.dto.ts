import { UpdateUserDto } from "../user/updateUser.dto";

export class UpdateMedicDto extends UpdateUserDto {
  constructor(
    id: number,
    first_name?: string,
    last_name?: string,
    email?: string,
    phone?: string,
    // public specialty?: "oftalmologia" | "etc",
    public licence_num?: number,
    // public schedule_from: Date,
    // public schedule_at: Date
  ) {
    super(id, first_name, last_name, email, phone);
  }
}
