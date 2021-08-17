export default interface Project {
  id: number;
  projectName: string;
  user: any;
  description?: string;
  startDate: Date;
  endDate: Date;
  status: string;
  isDeleted: boolean;
  numberOfTasks: any;
  numberOfMembers: any;
  projectMembers: any;
};
