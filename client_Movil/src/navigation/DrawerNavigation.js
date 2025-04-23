import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import CrudEmpleados from '../views/Administrador/CrudEmpleados/CrudEmpleados';
import IndexAdmin from '../views/Administrador/Index/indexAdmin';
import { TouchableOpacity, Text } from 'react-native';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const handleLogoutInternal = () => {
    props.onLogout();
  }


  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={handleLogoutInternal}>
        <Text>Cerrar Sesión</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigation({ onLogout }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} onLogout={onLogout} />}>
      <Drawer.Screen name="Crud Empleados" component={CrudEmpleados} />
      <Drawer.Screen name="IndexAdmin" component={IndexAdmin} />
    </Drawer.Navigator>
  );
}