import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.config";

interface MedicAttributes {
  id: number;
  specialty: "oftamologia" | "etc";
  licence_num: number;
  schedule_from: Date;
  schedule_at: Date;
  created_at: Date;
  updated_at: Date;
}

interface MedicCreationAttributes
  extends Optional<
    MedicAttributes,
    "id" | "schedule_from" | "schedule_at" | "created_at" | "updated_at"
  > {}

class Medic
  extends Model<MedicAttributes, MedicCreationAttributes>
  implements MedicAttributes
{
  public id!: number;
  public specialty!: "oftamologia" | "etc";
  public licence_num!: number;
  public schedule_from!: Date;
  public schedule_at!: Date;
  public created_at!: Date;
  public updated_at!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Medic.init(
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
    specialty: {
      type: DataTypes.ENUM("oftamologia", "etc"),
      allowNull: false,
    },
    licence_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    schedule_from: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    schedule_at: {
      type: DataTypes.DATE,
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
    tableName: "medic",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Medic;
