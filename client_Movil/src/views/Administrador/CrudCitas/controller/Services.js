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