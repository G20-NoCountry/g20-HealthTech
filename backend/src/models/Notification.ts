import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.config";

interface NotificationAttributes {
  id: number;
  user_id: number;
  appointment_id?: number;
  type: "email" | "sms";
  status: "queued" | "sent" | "failed";
  payload: object;
  created_at: Date;
  updated_at: Date;
}

interface NotificationCreationAttributes
  extends Optional<
    NotificationAttributes,
    "id" | "appointment_id" | "created_at" | "updated_at"
  > {}

class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  public id!: number;
  public user_id!: number;
  public appointment_id?: number;
  public type!: "email" | "sms";
  public status!: "queued" | "sent" | "failed";
  public payload!: object;
  public created_at!: Date;
  public updated_at!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "appointments",
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM("email", "sms"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("queued", "sent", "failed"),
      allowNull: false,
      defaultValue: "queued",
    },
    payload: {
      type: DataTypes.JSON,
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
    tableName: "notifications",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Notification;
