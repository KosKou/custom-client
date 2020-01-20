import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

// import CodeEditors from './views/Editors/CodeEditors'
const CodeEditors = React.lazy(() => import('./views/Editors/CodeEditors'));
const TextEditors = React.lazy(() => import('./views/Editors/TextEditors'));

const Compose = React.lazy(() => import('./views/Apps/Email/Compose'));
const Inbox = React.lazy(() => import('./views/Apps/Email/Inbox'));
const Message = React.lazy(() => import('./views/Apps/Email/Message'));
const Invoice = React.lazy(() => import('./views/Apps/Invoicing/Invoice'));

const AdvancedForms = React.lazy(() => import('./views/Forms/AdvancedForms'));
const BasicForms = React.lazy(() => import('./views/Forms/BasicForms'));
const ValidationForms = React.lazy(() => import('./views/Forms/ValidationForms'));
const GoogleMaps = React.lazy(() => import('./views/GoogleMaps'));
const Toastr = React.lazy(() => import('./views/Notifications/Toastr'));
const Calendar = React.lazy(() => import('./views/Plugins/Calendar'));
const Draggable = React.lazy(() => import('./views/Plugins/Draggable'));
const Spinners = React.lazy(() => import('./views/Plugins/Spinners'));
const DataTable = React.lazy(() => import('./views/Tables/DataTable'));
const Tables = React.lazy(() => import('./views/Tables/Tables'));
const LoadingButtons = React.lazy(() => import('./views/Buttons/LoadingButtons'));

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));

const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));

const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
// Comment BG001
// const Users = React.lazy(() => import('./views/Users/Users'));
// const User = React.lazy(() => import('./views/Users/User'));
const Users = React.lazy(() => import('./components/Users/UsersListComponent'));
const User = React.lazy(() => import('./components/Users/UserComponent'));
const DashboardS = React.lazy(() => import('./views/Dashboard/DashboardS'));
const Wallets = React.lazy(() => import('./components/Pages/WalletList'));
const Transaction = React.lazy(() => import('./components/Pages/Transaction'));


const Known = React.lazy(() => import('./components/Reports/KnowledgeReport'));
const Category = React.lazy(() => import('./components/Reports/CategoryReport'));
const Type = React.lazy(() => import('./components/Reports/TypeReport'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home', component: DefaultLayout, exact: true, roles: ["USER","ADMIN"] },
  { path: '/dashboard', name: 'Dashboard', component: DashboardS, roles: ["USER","ADMIN"] },
  { path: '/transaction', name: 'Transaction', component: Transaction, roles: ["USER","ADMIN"] },
  { path: '/wallets', name: 'Wallets', component: Wallets, roles: ["USER","ADMIN"] },
  { path: '/theme', name: 'Theme', component: Colors, exact: true, roles: ["USER","ADMIN"] },
  { path: '/theme/colors', name: 'Colors', component: Colors, roles: ["USER","ADMIN"] },
  { path: '/theme/typography', name: 'Typography', component: Typography, roles: ["USER","ADMIN"] },
  { path: '/base', name: 'Base', component: Cards, exact: true, roles: ["USER","ADMIN"] },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs, roles: ["USER","ADMIN"] },
  { path: '/base/cards', name: 'Cards', component: Cards, roles: ["USER","ADMIN"] },
  { path: '/base/carousels', name: 'Carousel', component: Carousels, roles: ["USER","ADMIN"] },
  { path: '/base/collapses', name: 'Collapse', component: Collapses, roles: ["USER","ADMIN"] },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns, roles: ["USER","ADMIN"] },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons, roles: ["USER","ADMIN"] },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups, roles: ["USER","ADMIN"] },
  { path: '/base/navbars', name: 'Navbars', component: Navbars, roles: ["USER","ADMIN"] },
  { path: '/base/navs', name: 'Navs', component: Navs, roles: ["USER","ADMIN"] },
  { path: '/base/paginations', name: 'Paginations', component: Paginations, roles: ["USER","ADMIN"] },
  { path: '/base/popovers', name: 'Popovers', component: Popovers, roles: ["USER","ADMIN"] },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar, roles: ["USER","ADMIN"] },
  { path: '/base/switches', name: 'Switches', component: Switches, roles: ["USER","ADMIN"] },
  { path: '/base/tabs', name: 'Tabs', component: Tabs, roles: ["USER","ADMIN"] },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips, roles: ["USER","ADMIN"] },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true, roles: ["USER","ADMIN"] },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons, roles: ["USER","ADMIN"] },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns, roles: ["USER","ADMIN"] },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups, roles: ["USER","ADMIN"] },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons, roles: ["USER","ADMIN"] },
  { path: '/buttons/loading-buttons', name: 'Loading Buttons', component: LoadingButtons, roles: ["USER","ADMIN"] },
  { path: '/charts', name: 'Charts', component: Charts, roles: ["USER","ADMIN"] },
  { path: '/editors', name: 'Editors', component: CodeEditors, exact: true, roles: ["USER","ADMIN"] },
  { path: '/editors/code-editors', name: 'Code Editors', component: CodeEditors, roles: ["USER","ADMIN"] },
  { path: '/editors/text-editors', name: 'Text Editors', component: TextEditors, roles: ["USER","ADMIN"] },
  { path: '/forms', name: 'Forms', component: BasicForms, exact: true, roles: ["USER","ADMIN"] },
  { path: '/forms/advanced-forms', name: 'Advanced Forms', component: AdvancedForms, roles: ["USER","ADMIN"] },
  { path: '/forms/basic-forms', name: 'Basic Forms', component: BasicForms, roles: ["USER","ADMIN"] },
  { path: '/forms/validation-forms', name: 'Form Validation', component: ValidationForms, roles: ["USER","ADMIN"] },
  { path: '/google-maps', name: 'Google Maps', component: GoogleMaps, roles: ["USER","ADMIN"] },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons, roles: ["USER","ADMIN"] },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons, roles: ["USER","ADMIN"] },
  { path: '/icons/flags', name: 'Flags', component: Flags, roles: ["USER","ADMIN"] },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome, roles: ["USER","ADMIN"] },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons, roles: ["USER","ADMIN"] },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true, roles: ["USER","ADMIN"] },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts, roles: ["USER","ADMIN"] },
  { path: '/notifications/badges', name: 'Badges', component: Badges, roles: ["USER","ADMIN"] },
  { path: '/notifications/modals', name: 'Modals', component: Modals, roles: ["USER","ADMIN"] },
  { path: '/notifications/toastr', name: 'Toastr', component: Toastr, roles: ["USER","ADMIN"] },
  { path: '/plugins', name: 'Plugins', component: Calendar, exact: true, roles: ["USER","ADMIN"] },
  { path: '/plugins/calendar', name: 'Calendar', component: Calendar, roles: ["USER","ADMIN"] },
  { path: '/plugins/draggable', name: 'Draggable Cards', component: Draggable, roles: ["USER","ADMIN"] },
  { path: '/plugins/spinners', name: 'Spinners', component: Spinners, roles: ["USER","ADMIN"] },
  { path: '/tables', name: 'Tables', component: Tables, exact: true, roles: ["USER","ADMIN"] },
  { path: '/tables/data-table', name: 'Data Table', component: DataTable, roles: ["USER","ADMIN"] },
  { path: '/tables/tables', name: 'Tables', component: Tables, roles: ["USER","ADMIN"] },
  { path: '/widgets', name: 'Widgets', component: Widgets, roles: ["USER","ADMIN"] },
  { path: '/apps', name: 'Apps', component: Compose, exact: true, roles: ["USER","ADMIN"] },
  { path: '/apps/email', name: 'Email', component: Compose, exact: true, roles: ["USER","ADMIN"] },
  { path: '/apps/email/compose', name: 'Compose', component: Compose, roles: ["USER","ADMIN"] },
  { path: '/apps/email/inbox', name: 'Inbox', component: Inbox, roles: ["USER","ADMIN"] },
  { path: '/apps/email/message', name: 'Message', component: Message, roles: ["USER","ADMIN"] },
  { path: '/apps/invoicing', name: 'Invoice', component: Invoice, exact: true, roles: ["USER","ADMIN"] },
  { path: '/apps/invoicing/invoice', name: 'Invoice', component: Invoice, roles: ["USER","ADMIN"] },
  { path: '/users', exact: true,  name: 'Users', component: Users, roles: ["ADMIN"] },
  { path: '/users/:id', exact: true, name: 'User Details', component: User, roles: ["ADMIN"] },

  { path: '/known', exact: true, name: 'Known Report', component: Known, roles: ["ADMIN"] },
  { path: '/category', exact: true, name: 'Category Report', component: Category, roles: ["ADMIN"] },
  { path: '/type', exact: true, name: 'Types Report', component: Type, roles: ["ADMIN"] }
];

export default routes;
