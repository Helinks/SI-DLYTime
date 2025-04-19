import { createDrawerNavigator } from '@react-navigation/drawer';
import CrudEmpleados from '../views/Administrador/CrudEmpleados/CrudEmpleados';
import IndexAdmin from '../views/Administrador/Index/indexAdmin';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Crud Empleados" component={CrudEmpleados} />
      <Drawer.Screen name="IndexAdmin" component={IndexAdmin} />
    </Drawer.Navigator>
  );
}