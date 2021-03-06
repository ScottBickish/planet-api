import { Auth0Provider } from '@bcwdev/auth0provider'
import { moonsService } from '../services/MoonsService'
import { planetsService } from '../services/PlanetsService'
import BaseController from '../utils/BaseController'

export class PlanetsController extends BaseController {
  constructor() {
    super('api/planets')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/moons', this.getAllMoons)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const planets = await planetsService.getAll(query)
      return res.send(planets)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const planet = await planetsService.getById(req.params.id)
      return res.send(planet)
    } catch (error) {
      next(error)
    }
  }

  async getAllMoons(req, res, next) {
    try {
      const moons = await moonsService.getAll({ planetId: req.params.id })
      return res.send(moons)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newplanet = await planetsService.create(req.body)
      return res.send(newplanet)
    } catch (error) {
      next(error)
    }
  }
}
