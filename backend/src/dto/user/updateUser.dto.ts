export class UpdateUserDto {
  constructor(
    public id: number,
    public first_name?: string,
    public last_name?: string,
    public email?: string,
    public phone?: string
  ) { }
}
