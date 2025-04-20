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
    paddingTop: '10%',
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  modalContenido: {
    width: '80%',
    maxHeight: "90%",
    minHeight: "80%",
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputText: {
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 16,
    margin: 8,
  },

  textPicker: {
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    paddingVertical: 0,
    height: 40,
    justifyContent: 'center',
    width: "100%",
    marginBottom: 12,
  },

  Picker: {
    height: 60,
    marginTop: -4,
    width: "100%",
  },

  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 10,

  },

  scrollViewContent: {
    flexgrow: 1
  }
});