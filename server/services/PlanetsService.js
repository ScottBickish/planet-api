import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PlanetsService {
  async getAll(query = {}) {
    const planets = await dbContext.Planets.find({}).populate('creator', 'name picture')
    return planets
  }

  async getById(planetId) {
    const planet = await dbContext.Planets.findOne({ _id: planetId }).populate('creator', 'name picture')
    if (!planet) {
      throw new BadRequest('Invalid ID')
    }
    return planet
  }

  async create(body) {
    const planet = await dbContext.Planets.create(body)
    return planet
  }
}

export const planetsService = new PlanetsService()
