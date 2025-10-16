import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.config";

interface MedicAttributes {
  id: number;
  specialty:
    | "oftamologia"
    | "cardiologia"
    | "neurologia"
    | "dermatologia"
    | "pediatria"
    | "ginecologia"
    | "traumatologia"
    | "psiquiatria"
    | "medicina_general";
  licence_num: number;
  schedule_from: Date;
  schedule_to: Date;
  created_at: Date;
  updated_at: Date;
}

interface MedicCreationAttributes
  extends Optional<
    MedicAttributes,
    "id" | "schedule_from" | "schedule_to" | "created_at" | "updated_at"
  > {}

class Medic
  extends Model<MedicAttributes, MedicCreationAttributes>
  implements MedicAttributes
{
  public id!: number;
  public specialty!:
    | "oftamologia"
    | "cardiologia"
    | "neurologia"
    | "dermatologia"
    | "pediatria"
    | "ginecologia"
    | "traumatologia"
    | "psiquiatria"
    | "medicina_general";
  public licence_num!: number;
  public schedule_from!: Date;
  public schedule_to!: Date;
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
      type: DataTypes.ENUM(
        "oftamologia",
        "cardiologia",
        "neurologia",
        "dermatologia",
        "pediatria",
        "ginecologia",
        "traumatologia",
        "psiquiatria",
        "medicina_general"
      ),
      allowNull: false,
    },
    licence_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    schedule_from: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    schedule_to: {
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
