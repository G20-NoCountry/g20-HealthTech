"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "medical_records",
      [
        {
          patient_id: 6, // Laura Fernández
          doctor_id: 2, // Dr. María García (Cardióloga)
          record_type: "consulta_cardiológica",
          content: JSON.stringify({
            motivo_consulta: "Dolor en el pecho intermitente",
            sintomas: [
              "Dolor opresivo en el pecho",
              "Falta de aire al hacer ejercicio",
              "Palpitaciones ocasionales",
            ],
            examen_fisico: {
              presion_arterial: "140/90 mmHg",
              frecuencia_cardiaca: "85 lpm",
              peso: "65 kg",
              altura: "1.65 m",
              imc: "23.9",
            },
            estudios_solicitados: [
              "Electrocardiograma",
              "Ecocardiograma",
              "Analisis de sangre completo",
            ],
            diagnostico: "Hipertensión arterial leve",
            tratamiento: {
              medicamentos: ["Enalapril 10mg diario"],
              recomendaciones: [
                "Reducir consumo de sal",
                "Ejercicio moderado 30 min/día",
                "Controlar peso",
              ],
            },
            proximo_control: "30 días",
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: 7, // Roberto Silva
          doctor_id: 3, // Dr. Juan Rodríguez (Neurólogo)
          record_type: "consulta_neurológica",
          content: JSON.stringify({
            motivo_consulta: "Dolores de cabeza frecuentes",
            sintomas: [
              "Cefalea pulsátil",
              "Sensibilidad a la luz",
              "Náuseas ocasionales",
            ],
            examen_fisico: {
              estado_mental: "Consciente y orientado",
              reflejos: "Normales",
              coordinacion: "Normal",
              fuerza_muscular: "5/5 en todas las extremidades",
            },
            estudios_solicitados: [
              "Resonancia magnética cerebral",
              "Tomografía computada",
            ],
            diagnostico: "Migraña sin aura",
            tratamiento: {
              medicamentos: ["Ibuprofeno 400mg cuando aparezca"],
              prevencion: [
                "Mantener horarios de sueño regulares",
                "Evitar alimentos desencadenantes",
                "Técnicas de relajación",
              ],
            },
            proximo_control: "2 meses",
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: 8, // Carmen González
          doctor_id: 4, // Dra. Ana López (Pediatra)
          record_type: "control_pediatrico",
          content: JSON.stringify({
            motivo_consulta: "Control de crecimiento y desarrollo",
            datos_paciente: {
              edad: "8 años",
              peso: "28 kg",
              altura: "1.25 m",
              percentil_peso: 75,
              percentil_altura: 60,
            },
            examen_fisico: {
              estado_general: "Bueno",
              desarrollo_motor: "Adecuado para la edad",
              lenguaje: "Desarrollo normal",
              vacunas: "Al día",
            },
            evaluacion: {
              crecimiento: "Normal",
              desarrollo: "Adecuado",
              alimentacion: "Variada y balanceada",
            },
            recomendaciones: [
              "Continuar con alimentación saludable",
              "Actividad física diaria",
              "Higiene dental adecuada",
            ],
            proximo_control: "6 meses",
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: 9, // Diego Pérez
          doctor_id: 5, // Dr. Carlos Martínez (Oftalmólogo)
          record_type: "consulta_oftalmologica",
          content: JSON.stringify({
            motivo_consulta: "Dificultad para ver de lejos",
            sintomas: [
              "Visión borrosa de lejos",
              "Fatiga visual",
              "Dolores de cabeza al final del día",
            ],
            examen_oftalmologico: {
              agudeza_visual_od: "20/40",
              agudeza_visual_oi: "20/30",
              presion_intraocular: "14 mmHg ambos ojos",
              fondo_de_ojo: "Normal",
            },
            estudios_realizados: [
              "Refracción",
              "Tonometría",
              "Examen de fondo de ojo",
            ],
            diagnostico: "Miopía leve",
            tratamiento: {
              correccion: "Lentes con graduación -1.50 dioptrías",
              recomendaciones: [
                "Uso de lentes para actividades de lejos",
                "Descansos visuales cada 20 minutos",
                "Iluminación adecuada para lectura",
              ],
            },
            proximo_control: "1 año",
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: 10, // Sofía Hernández
          doctor_id: 2, // Dr. María García (Cardióloga)
          record_type: "consulta_seguimiento",
          content: JSON.stringify({
            motivo_consulta: "Seguimiento de hipertensión",
            evolucion: "Paciente refiere mejoría en síntomas",
            examen_fisico: {
              presion_arterial: "130/85 mmHg",
              frecuencia_cardiaca: "78 lpm",
              peso: "63 kg",
            },
            estudios_previos: {
              ecg: "Ritmo sinusal normal",
              ecocardiograma: "Función ventricular normal",
            },
            evaluacion: "Buena respuesta al tratamiento",
            ajustes_tratamiento: {
              medicamentos: ["Enalapril 5mg diario (reducido)"],
              recomendaciones: [
                "Continuar dieta baja en sodio",
                "Mantener actividad física",
              ],
            },
            proximo_control: "3 meses",
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("medical_records", null, {});
  },
};
