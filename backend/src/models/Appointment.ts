import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.config";

interface AppointmentAttributes {
  id: number;
  patient_id: number;
  doctor_id: number;
  start_at: Date;
  symptoms: string;
  diagnostic: string;
  type: "in_person" | "virtual";
  location?: string;
  created_at: Date;
  updated_at: Date;
}

interface AppointmentCreationAttributes
  extends Optional<
    AppointmentAttributes,
    "id" | "location" | "created_at" | "updated_at"
  > {}

class Appointment
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes
{
  public id!: number;
  public patient_id!: number;
  public doctor_id!: number;
  public start_at!: Date;
  public symptoms!: string;
  public diagnostic!: string;
  public type!: "in_person" | "virtual";
  public location?: string;
  public created_at!: Date;
  public updated_at!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    start_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    symptoms: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    diagnostic: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("in_person", "virtual"),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "appointments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Appointment;
