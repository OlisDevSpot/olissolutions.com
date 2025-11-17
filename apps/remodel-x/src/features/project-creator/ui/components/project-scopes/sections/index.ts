import { ProjectScopeCustomization } from "./project-scope-customization"
import { ProjectScopeSelector } from "./project-scope-selector"

export const projectScopesSteps = [
  {
    accessor: "scope-selection",
    label: "Scope selection",
    description: "Select the scope for this project",
    Component: ProjectScopeSelector
  },
  {
    accessor: "scope-specifics",
    label: "Scope specifics",
    description: "Modify the scope specifics",
    Component: ProjectScopeCustomization
  }
]
