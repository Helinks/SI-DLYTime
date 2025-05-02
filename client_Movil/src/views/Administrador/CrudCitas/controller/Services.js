import { url } from '../../../../Global/url';
import axios from 'axios';

export const Getcrud = async (setCitas) => {
    try {
        const response = await axios.get(url() + '/crudCitas/crudCita')
        console.log("actualizo")
        return setCitas(response.data);
    } catch (error) {
        return console.log(error);
    }
}

export const getHorarios = async (fecha, setHorarios) => {
    try {
        const response = await axios.get(url() + "/crudCitas/getHorarios", {
            params: { fecha: fecha },
        })

        return setHorarios(response.data);
    } catch (err) {
        return console.log(err)
    }
}

export const Getconsulta = async (setConsulta) => {
    try {
        const response = await axios.get(url() + "/crudCitas/getTipoConsulta")

        return setConsulta(response.data);
    } catch (err) {
        return console.log(err)
    }
}

export const actualizarCita = async (id,idHorario1,idHorario,tipoConsulta) => {
    try {
        const response = await axios.patch(url() + "/crudCitas/updateCita", 
            {
                idCita: id,
                idHorario1: idHorario1,
                idHorario: idHorario,
                idTipoConsulta: tipoConsulta
            }
        )

        return response.data;
    } catch (err) {
        return err.data;
    }
}

export const getEmpleado = async (setEmpleado) => {
    try {
        const response = await axios.get(url() + "/crudEmpleados/consultaEmpleado")

        return setEmpleado(response.data);
    } catch (err) {
        return err.data;
    }
}

export const getCliente = async (cliente,setCliente) => {
    try {
        const response = await axios.get(url() + "/crudCitas/getClientes", {
            params: { NumeroDocumentoCliente: cliente },
          })

          console.log( "datos del response del getcliente", response.data)

        return setCliente(response.data);
    } catch (err) {
        return err.data;
    }
}

export const addCliente = async (NumeroDocumentoCliente,NumeroDocumentoOftalmologo,idHorario,idTipoConsulta) => {
    try {
        console.log( "datos del agregar cita: ", NumeroDocumentoCliente,NumeroDocumentoOftalmologo,idHorario,idTipoConsulta)
        const response = await axios.post(url() + "/crudCitas/addCita", {
            NumeroDocumentoCliente,NumeroDocumentoOftalmologo,idHorario,idTipoConsulta
          })


        return setCitas(response.data);
    } catch (err) {
        return err.data;
    }
}

