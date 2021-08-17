export default interface TaskModify {
    taskName: string,
    description: string,
    startDate: Date,
    endDate: Date
    status: string,
    isDeleted: string,
    project: number,
}