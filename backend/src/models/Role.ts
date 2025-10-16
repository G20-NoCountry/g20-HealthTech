import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.config";

interface RoleAttributes {
  id: number;
  rol: string;
  created_at: Date;
  updated_at: Date;
}

interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id" | "created_at" | "updated_at"> {}

class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  public id!: number;
  public rol!: string;
  public created_at!: Date;
  public updated_at!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
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
    tableName: "roles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Role;
