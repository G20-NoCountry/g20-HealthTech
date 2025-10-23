import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.config";

interface PatientAttributes {
  id: number;
  id_health_insurance: number;
  blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  alergias: string;
  cronicas_condition: string;
  actual_medication: string;
  location: string;
  created_at: Date;
  updated_at: Date;
}

interface PatientCreationAttributes
  extends Optional<PatientAttributes, "id" | "created_at" | "updated_at"> {}

class Patient
  extends Model<PatientAttributes, PatientCreationAttributes>
  implements PatientAttributes
{
  public id!: number;
  public id_health_insurance!: number;
  public blood_type!: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  public alergias!: string;
  public cronicas_condition!: string;
  public actual_medication!: string;
  public location!: string;
  public created_at!: Date;
  public updated_at!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    id_health_insurance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "health_insurance",
        key: "id",
      },
    },
    blood_type: {
      type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
      allowNull: false,
    },
    alergias: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cronicas_condition: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    actual_medication: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    tableName: "patients",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Patient;
