export const menuItems = {
  paciente: [
    { to: '/dashboard', icon: 'pi pi-home', label: 'Inicio' },
    { to: '/profile', icon: 'pi pi-user', label: 'Perfil' },
    { to: '/clinical-records', icon: 'pi pi-folder-open', label: 'Historial de Turnos' },
    { to: '/payments', icon: 'pi pi-credit-card', label: 'Pagos' },
    { to: '/settings', icon: 'pi pi-cog', label: 'Ajustes' },
  ],
  medico: [
    { to: '/dashboardMedico', icon: 'pi pi-home', label: 'Inicio' },
    { to: '/doctor-profile', icon: 'pi pi-user', label: 'Perfil' },
    { to: '/payments-history', icon: 'pi pi-credit-card', label: 'Historial de Pagos' },
    { to: '/settings-medico', icon: 'pi pi-cog', label: 'Ajustes' },
  ],
};
