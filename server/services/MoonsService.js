import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class MoonsService {
  async getAll(query = {}) {
    const moons = await dbContext.Moons.find({}).populate('creator', 'name picture')
    return moons
  }

  async getById(moonId) {
    const moon = await dbContext.Moons.findOne({ _id: moonId }).populate('creator', 'name picture')
    if (!moon) {
      throw new BadRequest('Invalid ID')
    }
    return moon
  }

  async create(body) {
    const moon = await dbContext.Moons.create(body)
    return moon
  }
}

export const moonsService = new MoonsService()
