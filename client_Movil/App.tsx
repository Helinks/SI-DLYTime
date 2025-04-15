import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import CRUDEmpleado from './src/views/Administrador/CrudEmpleados/CrudEmpleados'; // Asegúrate de importar correctamente el archivo CRUDEmpleado

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <CRUDEmpleado/>
      </View>
    </SafeAreaView>
  );
}