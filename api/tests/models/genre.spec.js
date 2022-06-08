const { Genre, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Genre model', () => {
    before(() => conn.authenticate()
      .catch((err) => {
        console.error('No se logra una conexión con la base de datos:', err);
      }));
    describe('Validators', () => {
      beforeEach(() => Genre.sync({ force: true }));
      describe('name', () => {
        it('Debe arrojar un error si el id es nulo', (done) => {
          Genre.create({name: "Action"})
            .then(() => done(new Error('Se requiere un id valido')))
            .catch(() => done());
        });
        it('Debe guardar un genero si se pasan los datos correctos', async () => {
            const genre = await Genre.create({ 
              id: 12, 
              name: "Action" 
            });
            expect(genre.dataValues.id).equal(12)
            expect(genre.dataValues.name).equal("Action")
          });
        it('Debe arrojar un error si se repite un id', (done) => {
          Genre.create({id: 10, name: "Indie"})
          Genre.create({id: 10, name: "Simulation"})
            .then(() => done(new Error('El id debe ser único para cada género')))
            .catch(() => done());
        });
      });
    });
  });
;