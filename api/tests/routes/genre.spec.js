const session = require('supertest-session');
const app = require('../../src/app.js');
const { Genre, conn } = require('../../src/db.js');

const agent = session(app);

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Genre.sync({ force: true }))
  describe('GET /genres', () => {
    it('Responde con un status 200', () =>
      agent.get('/api/genres').expect(200)
    );
    it('Responde con un JSON', () =>
      agent.get('/api/genres').expect('Content-Type', /json/)
    );
    it('Responde con los generos creados', async () =>
      {
        const genre1 = await Genre.create({ 
            id: 12, 
            name: "Action" 
        });
        const genre2 = await Genre.create({ 
            id: 15, 
            name: "Shooter" 
        });
        agent.get('/api/genres').expect((res) => {
            expect(res.body).equal([{id: 12, name:Action}, {id:15, name:"Shooter"}])
        })
      }
    );
  });
});