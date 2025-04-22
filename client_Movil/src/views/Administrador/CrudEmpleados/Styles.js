import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    botones: {
        backgroundColor: '#FF5757',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 10,
    },
    container: {
        paddingTop: '20%',
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
    topBar: { 
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    tabla: {
        marginTop: 20,
        borderRadius: 25,
    },
    fila: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    celda: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
    },
    textoCelda: {
        textAlign: 'center',
    },
    encabezado: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#FF5757',
    },
    modalFondo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContenido: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
      },
      titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },     
});