
const PREPARED_STATEMENT_STORE_APPLICATION = 'INSERT INTO Application (version, person, status) VALUES ($1, $2, $3);'
const PREPARED_STATEMENT_STORE_AVAILABILITY = 'INSERT INTO Availability (person, from_date, to_date) VALUES ($1, $2, $3);'
const PREPARED_STATEMENT_STORE_COMPETENCE_PROFILE = 'INSERT INTO Competence_profile (person_id, competence_id, years_of_experience) VALUES ($1, $2, $3);'

const PREPARED_STATEMENT_FIND_APPLICATION = 'SELECT * FROM Application WHERE person = $1;'
const PREPARED_STATEMENT_FIND_COMPETENCES = 'SELECT * FROM Competence_profile WHERE person = $1;'
const PREPARED_STATEMENT_FIND_AVAILABILITIES = 'SELECT * FROM Availability WHERE person = $1;'

async function store(application) {
    const { person, availabilities, competences, status, version } = application
    try {
        await db.query(PREPARED_STATEMENT_STORE_APPLICATION, [version, person, status])
        for (let availability of availabilities) {
            await db.query(PREPARED_STATEMENT_STORE_AVAILABILITY, [person, availability.fromDate, availabilty.toDate])
        }
        for (let competence of competences) {
            await db.query(PREPARED_STATEMENT_STORE_COMPETENCE_PROFILE, [person, competence.id, competence.years_of_experience])
        }

    } catch (error) {
        throw { code: 500, message: `Database error: ${error.message}` }
    }
}

async function find(personId) {
    const values = await Promise.all([
        db.query(PREPARED_STATEMENT_FIND_APPLICATION, [personId]),
        db.query(PREPARED_STATEMENT_FIND_COMPETENCES, [personId]),
        db.query(PREPARED_STATEMENT_FIND_AVAILABILITIES, [personId])
    ])
    const application = values[0] 
    const competences = values[1] 
    const availabilites = values[2]
    const applicationDetails = {
        person: personId,
        version: application.version,
        status: application.status,
        availabilites: availabilites,
        competences: competences
    }
    return new Application(applicationDetails)
}