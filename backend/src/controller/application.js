const { Application, exists: applicationExists } = require('../model/Application')

async function createApplication (form, user) {
  if (await applicationExists(user.person_id)) {
    throw { code: 409, message: 'Application already exists' }
  }
  try {
    await new Application(form, user).store()
  } catch (error) {
    throw { code: error.code, message: `Database Error ${error}` }
  }
}

module.exports = { createApplication }
