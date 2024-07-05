import { CreateDepartment } from './create-department'
import { DeleteDepartment } from './delete-department'
import { ShowDepartments } from './show-departments'
import { UpdateDepartment } from './update-department'
import { ViewDepartment } from './view-department'

export const DepartmentController = {
  show: ShowDepartments,
  create: CreateDepartment,
  view: ViewDepartment,
  update: UpdateDepartment,
  delete: DeleteDepartment,
}
