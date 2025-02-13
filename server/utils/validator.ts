import { createError } from 'h3'
import { z, type ZodSchema } from 'zod'

class Validator {
  /**
   *  Validate the request body
   * @param data any - the request body
   * @param schema ZodSchema - The schema to validate against
   * @param data any - the request body
   */
  validateSchema(schema: ZodSchema, data: any) {
    try {
      schema.parse(data)
    }
    catch (e) {
      const errorObj: { [key: string]: any } = {}

      if (e instanceof z.ZodError) {
        for (const error of e.issues) {
          if (error.path.length === 1)
            errorObj[error.path[0]] = error.message

          if (error.path.length === 2)
            errorObj[error.path[1]] = error

          if (error.path.length === 3)
            errorObj[`${error.path[1]}.${error.path[2]}`] = error
        }

        throw createError({
          statusCode: 400,
          statusMessage: 'Validation Error',
          data: errorObj,
        })
      }
    }
  }
}
export default new Validator()
