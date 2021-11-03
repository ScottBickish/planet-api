import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { MoonSchema } from '../models/Moon'
import { PlanetSchema } from '../models/Planet'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Moons = mongoose.model('Moon', MoonSchema)
  Planets = mongoose.model('planet', PlanetSchema);
}

export const dbContext = new DbContext()
