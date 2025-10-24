import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.config";

interface HealthInsuranceAttributes {
  id: number;
  name: "OSDE" | "UOM" | "Otros" | "etc";
  created_at: Date;
  updated_at: Date;
}

interface HealthInsuranceCreationAttributes
  extends Optional<
    HealthInsuranceAttributes,
    "id" | "created_at" | "updated_at"
  > {}

class HealthInsurance
  extends Model<HealthInsuranceAttributes, HealthInsuranceCreationAttributes>
  implements HealthInsuranceAttributes
{
  public id!: number;
  public name!: "OSDE" | "UOM" | "Otros" | "etc";
  public created_at!: Date;
  public updated_at!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

HealthInsurance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM("OSDE", "UOM", "Otros", "etc"),
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
    tableName: "health_insurance",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default HealthInsurance;
