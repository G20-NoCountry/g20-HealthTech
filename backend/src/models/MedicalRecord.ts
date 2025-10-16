import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.config";

interface MedicalRecordAttributes {
  id: number;
  patient_id: number;
  doctor_id: number;
  record_type: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

interface MedicalRecordCreationAttributes
  extends Optional<
    MedicalRecordAttributes,
    "id" | "created_at" | "updated_at"
  > {}

class MedicalRecord
  extends Model<MedicalRecordAttributes, MedicalRecordCreationAttributes>
  implements MedicalRecordAttributes
{
  public id!: number;
  public patient_id!: number;
  public doctor_id!: number;
  public record_type!: string;
  public content!: string;
  public created_at!: Date;
  public updated_at!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MedicalRecord.init(
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
    record_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT("long"),
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
    tableName: "medical_records",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default MedicalRecord;
