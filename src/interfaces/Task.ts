import Project from "../interfaces/Project"
import User from "./User";
export default interface Task {
    id: string,
    taskName: string,
    description: string,
    startDate: Date,
    endDate: Date
    status: string,
    projectId: number,
    isDeleted: boolean,
    project: Project,
    user:User,
}