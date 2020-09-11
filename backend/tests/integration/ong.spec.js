const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');


describe('ONG', () =>{
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(() => {
        connection.destroy();
    });

    it('should be able to create a new ONG', async ()=>{
        const response = await request(app).post('/ongs').send({
            name: "APAD",
            email: "teste@gmail.com",
            whatsapp: "6350000000",
            city: "Palmas",
            uf: "TO"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});