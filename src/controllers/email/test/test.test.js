const request = require('supertest');
const server = require('../../../server');

it('Envia emails con inputs válidos', async () => {
    return request(server)
        .post('/api/email')
        .send({
            to: 'mr.francodobarro@gmail.com',
            subject: 'pruebas send email',
            text: 'probando si anda bien sendgrid para enviar emails',
            html: "<h1>ÚNICO TEST</h1>",
            sandboxMode: true
        })
        .expect(200);
})

it('Retorna un estado 400 si las credenciales son incorrectas', async () => {
    return request(server)
        .post('/api/email')
        .send({
            to: '',
            subject: '',
            text: 'probando si anda bien sendgrid para enviar emails',
            html: "<h1>ÚNICO TEST</h1>",
            sandboxMode: true
        })
        .expect(404);
})
