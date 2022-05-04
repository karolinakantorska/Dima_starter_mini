import { ProjectsListType, ProjectType, FilterParams } from "./TS/interface"


export function filter(allProjects: ProjectsListType, { objektAlter, objektType, services }: FilterParams) {
    function filterAlter(project: ProjectType) {
        return (objektAlter === 'Alle') ? true : project.objektAlter === objektAlter
    }
    function filterType(project: ProjectType) {
        return (objektType === 'Alle') ? true : project.objektType === objektType;
    }
    function filterServices(project: ProjectType) {
        return (services === 'Alle') ? true : project.services.includes(services)
    }
    return allProjects.filter(filterAlter).filter(filterServices).filter(filterType)
}