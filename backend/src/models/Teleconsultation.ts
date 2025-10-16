import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.config";

interface TeleconsultationAttributes {
  id: number;
  appointment_id: number;
  session_url: string;
  status: "pending" | "started" | "ended";
  created_at: Date;
  updated_at: Date;
}

interface TeleconsultationCreationAttributes
  extends Optional<
    TeleconsultationAttributes,
    "id" | "created_at" | "updated_at"
  > {}

class Teleconsultation
  extends Model<TeleconsultationAttributes, TeleconsultationCreationAttributes>
  implements TeleconsultationAttributes
{
  public id!: number;
  public appointment_id!: number;
  public session_url!: string;
  public status!: "pending" | "started" | "ended";
  public created_at!: Date;
  public updated_at!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Teleconsultation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "appointments",
        key: "id",
      },
    },
    session_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "started", "ended"),
      allowNull: false,
      defaultValue: "pending",
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
    tableName: "teleconsultations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Teleconsultation;
