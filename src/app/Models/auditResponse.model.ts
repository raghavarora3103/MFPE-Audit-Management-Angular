export class AuditResponse{
    constructor(
        public auditId:number,
        public projectName:string,
        public managerName:string,
        public projectStatus:string,
        public remedyAction:string
    ){}
}