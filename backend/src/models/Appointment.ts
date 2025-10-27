import { DataTypes, Model, Optional, Op } from "sequelize";
import { sequelize } from "../config/database.config";

interface AppointmentAttributes {
  id: number;
  patient_id: number;
  medic_id: number;
  start_at: Date;
  end_at: Date;
  symptoms: string;
  diagnostic: string;
  type: "in_person" | "virtual";
  location?: string;
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  deleted_at?: Date;
  cancellation_reason?: string;
  created_at: Date;
  updated_at: Date;
}

interface AppointmentCreationAttributes
  extends Optional<
    AppointmentAttributes,
    "id" | "location" | "diagnostic" | "status" | "deleted_at" | "cancellation_reason" | "created_at" | "updated_at"
  > {}

class Appointment
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes
{
  public id!: number;
  public patient_id!: number;
  public medic_id!: number;
  public start_at!: Date;
  public end_at!: Date;
  public symptoms!: string;
  public diagnostic!: string;
  public type!: "in_person" | "virtual";
  public location?: string;
  public status!: "scheduled" | "completed" | "cancelled" | "no_show";
  public deleted_at?: Date;
  public cancellation_reason?: string;
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
    medic_id: {
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
    end_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    symptoms: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    diagnostic: {
      type: DataTypes.STRING(100),
      allowNull: true, // El diagnóstico se agrega después por el médico
    },
    type: {
      type: DataTypes.ENUM("in_person", "virtual"),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("scheduled", "completed", "cancelled", "no_show"),
      allowNull: false,
      defaultValue: "scheduled",
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cancellation_reason: {
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
    paranoid: false, // No usar paranoid de Sequelize, manejamos soft delete manualmente
  }
);

// Métodos de borrado lógico
(Appointment.prototype as any).softDelete = function(reason?: string) {
  this.deleted_at = new Date();
  this.status = 'cancelled';
  if (reason) {
    this.cancellation_reason = reason;
  }
  return this.save();
};

(Appointment.prototype as any).restore = function() {
  this.deleted_at = undefined;
  this.status = 'scheduled';
  this.cancellation_reason = undefined;
  return this.save();
};

// Método estático para obtener solo registros no eliminados
(Appointment as any).findActive = function(options: any = {}) {
  return Appointment.findAll({
    ...options,
    where: {
      ...options.where,
      deleted_at: null
    }
  });
};

// Método estático para obtener solo registros eliminados
(Appointment as any).findDeleted = function(options: any = {}) {
  return Appointment.findAll({
    ...options,
    where: {
      ...options.where,
      deleted_at: { [Op.not]: null }
    }
  });
};

export default Appointment;
