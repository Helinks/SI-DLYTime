import {http, HttpResponse} from 'msw';

export const handlers = [
    http.get('http://localhost:3001/crudCitas/addCita/getClientes', ({request})=>{
        const url= new URL (request.url);
        const numeroDocumentoCliente = url.searchParams.get('NumeroDocumentoCliente');
        if(numeroDocumentoCliente === '123456789'){
            return HttpResponse.json([
             {nombre: 'Cliente Test', numeroDocumento:'123456789',correo:'cliente@test.com' },
            ],
            {status: 200});
        }
        return HttpResponse.json([], {status: 200})
    }),
    http.get('http://localhost:3001/crudCitas/addCita/getEmpleados',()=>{
        return HttpResponse.json([
            {nombre: 'Doctor uno', numeroDocumento: '987654321'},
            {nombre: 'Doctor dos', numeroDocumento: '112233445'},
        ], {status: 200});
    }),
    http.get('http://localhost:3001/crudCitas/addCita/getTipoConsulta',()=>{
        return HttpResponse.json([
            {idTipoConsulta: 1, nombre: 'Consulta General'},
            {idTipoConsulta: 2, nombre: 'Examen de agudeza'},
        ], {status: 200});
    }),

    http.get('http://localhost:3001/crudCitas/addCita/getHorarios',({request})=>{
        const url = new URL(request.url);
        const fecha = url.searchParamas.get('fecha');
        if(fecha === '2025-12-25'){
            return HttpResponse.json([
                {id: 101, hora: '08:00'},
                {id: 102, hora: '09:00'},
                {id: 103, hora: '10:00'},
            ], {status: 200});
        }
        return HttpResponse.json([], {status:200});
    }),

    http.post('http://localhost:3001/crudCitas/addCita/addCita',async ({request})=>{
        const body = await request.json();
        console.log('Se recibió el cuerpo de la solicitud:', body);

        if(body.idHorario && body.fecha && body.hora && body.NumeroDocumentoCliente && body.NumeroDocumentoOftalmologo && body.idTipoConsulta){
            return HttpResponse.text('Cita agendada exitosamente', {status: 201});
        }

        return HttpResponse.json('Datos invalidos para agendar la cita', {status: 400});
    }),

    http.get('http://localhost:3001/crudCitas/crudCita', ()=>{
        return HttpResponse.json([], {status: 200})
    })
]   