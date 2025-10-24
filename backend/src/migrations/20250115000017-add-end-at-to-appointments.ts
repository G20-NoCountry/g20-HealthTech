import { QueryInterface, DataTypes } from "sequelize";

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  // Check if end_at column already exists
  const tableDescription = await queryInterface.describeTable("appointments");

  if (!tableDescription.end_at) {
    await queryInterface.addColumn("appointments", "end_at", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    });
  }
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.removeColumn("appointments", "end_at");
};
