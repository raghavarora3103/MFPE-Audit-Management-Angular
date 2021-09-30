import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ChecklistComponent } from '../checklist/checklist.component';


@Injectable({providedIn: 'root'})
export class GetQuestionsList{

  private projectName="";
  private auditType:number=2;
  private response:{questionId:number, answer:string}[]=[
    {"questionId":-1, "answer":" "},
    {"questionId":-1, "answer":" "},
    {"questionId":-1, "answer":" "},
    {"questionId":-1, "answer":" "},
    {"questionId":-1, "answer":" "},
  ];

  constructor(private http:HttpClient){}
 

    sendResponse(){
      return this.response;
    }

    getResponse(res:{questionId:number, answer:string}[]){
      this.response=res;
      console.log(this.response);
    }
    
    validateResponse(res:{questionId:number, answer:string}[])
    {
      for(var str of res){
        if(str.answer==" ")
        return false;
      }
      return true;
    }
    setDetails(name:string,type:number){
      this.projectName=name;
      this.auditType=type;
    }
    
    getProjectName(){
      return this.projectName;
    }
    getAuditType(){
      return this.auditType;
    }


}
