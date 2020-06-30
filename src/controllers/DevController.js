const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringToArray = require('../utils/parseStringToArray');

/**
 * index: listar todos os registros
 * show: exibir/recuperar um único registro
 * store: salvar registros
 * update: alterar registros
 * destroy: remover registros
 * 
 * Métodos HTTP:
 * GET: Consulta de dados
 * POST: Inserção de dados
 * PUT: Alteração de dados
 * DELETE: Remoção de dados
 * 
 * Tipos de parâmetros:
 * Query params: request.query (Filtros, ordenação, paginação e etc.)
 * Route params: request.params (Identificação de registros a serem alterados ou removidos)
 * Request body: request.body (Dados para criação ou alteração de um registro)
 * 
 * MongoDB (Não relacional)
 */

module.exports = {
    async index (request, response) 
    {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response) 
    {
        const { github_user, techs, latitude, longitude } = request.body;
    
        let dev = await Dev.findOne({ github_user });

        if (! dev) {

            const apiResponse = await axios.get('https://api.github.com/users/' + github_user);
    
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringToArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        
            dev = await Dev.create({
                github_user,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

        }
    
        return response.json(dev);
    },

    async update(request, response) 
    {
        const { id } = request.params;
        const { name, bio, techs, latitude, longitude } = request.body;

        const techsArray = parseStringToArray(techs);
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };
    
        dev = await Dev.updateOne({ _id: id }, { 
            name, 
            bio, 
            techs: techsArray,
            location
        });

        return response.json(dev.nModified);
    },

    async destroy(request, response) 
    {
        const { id } = request.params;
    
        dev = await Dev.deleteOne({ _id: id });

        return response.json(dev.deletedCount);
    },
}
