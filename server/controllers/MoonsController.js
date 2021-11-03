import { Auth0Provider } from '@bcwdev/auth0provider'
import { moonsService } from '../services/MoonsService'
import BaseController from '../utils/BaseController'

export class MoonsController extends BaseController {
  constructor() {
    super('api/moons')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const moon = await moonsService.getAll(query)
      return res.send(moon)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const moon = await moonsService.getById(req.params.id)
      return res.send(moon)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newmoon = await moonsService.create(req.body)
      return res.send(newmoon)
    } catch (error) {
      next(error)
    }
  }
}
