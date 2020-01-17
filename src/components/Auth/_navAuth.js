export default {
  items: [
    {
      name: 'Home',
      roles: ["USER", "ADMIN"], //BG001
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'Go!',
      },
    },
    {
      title: true,
      roles: ["ADMIN"], //BG001
      name: 'GESTIÓN',
      wrapper: {
        element: '',
        attributes: {},
      },
      class: ''
    },
    {
      roles: ["ADMIN"], //BG001
      name: 'Usuarios',
      url: '/users',
      icon: 'icon-user',
    },
    {
      title: true,
      roles: ["USER","SPECIALIST","ADMIN"], //BG001
      name: 'CONSULTAS',
      wrapper: {
        element: '',
        attributes: {},
      },
      class: ''
    },
    {
      roles: ["USER", "ADMIN", "SPECIALIST"], //BG001
      name: 'Historial',
      url: '/users',
      icon: 'icon-calendar',
    }
    // ,
    // {
    //   title: true,
    //   roles: ["ADMIN"], //BG001
    //   name: 'REPORTES',
    //   wrapper: {
    //     element: '',
    //     attributes: {},
    //   },
    //   class: ''
    // },
    // {
    //   roles: ["ADMIN"], //BG001
    //   name: 'Areas de Saber',
    //   url: '/known',
    //   icon: 'icon-speedometer',
    // },
    // {
    //   roles: ["ADMIN"], //BG001
    //   name: 'Categorias',
    //   url: '/category',
    //   icon: 'icon-speedometer',
    // },
    // {
    //   roles: ["ADMIN"], //BG001
    //   name: 'Tipos de Ofertas',
    //   url: '/type',
    //   icon: 'icon-speedometer',
    // }
  ]
};
