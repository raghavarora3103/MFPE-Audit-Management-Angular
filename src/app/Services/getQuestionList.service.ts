import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ChecklistComponent } from '../checklist/checklist.component';


@Injectable({providedIn: 'root'})
export class GetQuestionsList{

  private projectName="";
  private auditType:number=2;
  private response:{questionId:number, answer:string}[]=[
    {"questionId":-1, "answer":"none"},
    {"questionId":-1, "answer":"none"},
    {"questionId":-1, "answer":"none"},
    {"questionId":-1, "answer":"none"},
    {"questionId":-1, "answer":"none"},
  ];

  constructor(private http:HttpClient){}
 

    sendResponse(){
      return this.response;
    }

    getResponse(res:{questionId:number, answer:string}[]){
      this.response=res;
      console.log("IN SERVICE")
      console.log(this.response);
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
