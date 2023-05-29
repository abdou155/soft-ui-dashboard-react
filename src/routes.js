/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Leads from "layouts/leads";
import Customers from "layouts/customers";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Settings from "examples/Icons/Settings";
import CreditCard from "examples/Icons/CreditCard";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import RoomIcon from '@mui/icons-material/Room';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Parkings from "layouts/parkings";
import ParkingForm from "layouts/parkings/parking-form";
import { useEffect } from "react";
import Vips from "layouts/vips";
import Spots from "layouts/spots";
import UpdateAdmin from "layouts/profile/components/UpdateAdmin";



const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <DashboardIcon size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  { type: "title", title: "Customers", key: "customers-type-pages" },
  {
    type: "collapse",
    name: "Leads",
    key: "leads",
    route: "/leads",
    icon: <PersonIcon size="12px" />,
    component: <Leads />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Customers",
    key: "customers",
    route: "/customers",
    icon: <PeopleAltIcon size="12px" />,
    component: <Customers />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "VIPs",
    key: "vips",
    route: "/vips",
    icon: <AutoAwesomeIcon size="12px" />,
    component: <Vips />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Transactions",
    key: "transactions",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  /* {
    type: "collapse",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <Cube size="12px" />,
    component: <VirtualReality />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    route: "/rtl",
    icon: <Settings size="12px" />,
    component: <RTL />,
    noCollapse: true,
  }, */
  { type: "title", title: "Parking Managment", key: "parking-managment-pages" },
  {
    type: "collapse",
    name: "Parkings",
    key: "parkings",
    route: "/parkings",
    icon: <LocalParkingIcon size="12px" />,
    component: <Parkings />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Spots",
    key: "spots",
    route: "/spots",
    icon: <RoomIcon size="12px" />,
    component: <Spots />,
    noCollapse: true,
  },
  { type: "title", title: "Admin Settings", key: "admin-settings-pages" },
/*   {
    type: "collapse",
    name: "Configuration",
    key: "settings",
    route: "/authentication/sign-in",
    icon: <Settings size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  }, */
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <AccountCircleIcon size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Log out",
    key: "log-out",
    route: "/authentication/sign-in",
    icon: <LogoutIcon size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Parking Form",
    key: "parking-form",
    route: "/parkings/parking-form",
    icon: <LogoutIcon size="12px" />,
    component: <ParkingForm />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Adminn Form",
    key: "admin-form",
    route: "/admin/admin-form",
    icon: <LogoutIcon size="12px" />,
    component: <UpdateAdmin />,
    noCollapse: true,
  },
];

export default routes;
