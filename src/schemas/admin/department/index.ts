import { createDepartmentSchema } from './create-department-schema'
export type { CreateDepartmentRequest } from './create-department-schema'

export const DepartmentSchema = {
  create: createDepartmentSchema,
}
