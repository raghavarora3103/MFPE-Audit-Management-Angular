
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, Inject} from "@angular/core";
import { Router } from '@angular/router';
import { SeverityURL } from '../Models/tokens';

import { GetQuestionsList } from './getQuestionList.service';
import { Security } from './security.service';


@Injectable({providedIn: 'root'})

export class Severity{
    private token=localStorage.getItem('auditToken');

    headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${this.token}`
      })
    }

    constructor(private http:HttpClient,
      private route:Router,
      private qList:GetQuestionsList,
      private security:Security,
      @Inject(SeverityURL) private severityUrl:string
      ){

    }

    requestData1=
    {
      "projectName": "",
      "projectManagerName": "",
      "applicationOwnerName": "",
      "auditDetail": {
        "auditType": 0,
        "auditDate": "",
         "responses" :[
          {
            "questionId": 0,
            "answer": false
          },
          {
            "questionId": 1,
            "answer": false
          },
          {
            "questionId": 0,
            "answer": false
          },
          {
            "questionId": 0,
            "answer": false
          },
          {
            "questionId": 0,
            "answer": true
          }
        ]
      }
    };
    
    setDetails(){
      this.requestData1.projectName=this.qList.getProjectName(),
   this.requestData1.projectManagerName=this.security.getUserName(),
  this.requestData1.applicationOwnerName= "Raghav",
  this.requestData1.auditDetail.auditType=this.qList.getAuditType();
  this.requestData1.auditDetail.auditDate="2021-09-22T12:07:51.075Z";
  this.requestData1.auditDetail.responses=this.getResponses(this.qList.sendResponse());
    }

    getResponses(res:{questionId:number, answer:string}[]){
      var temp:{questionId:number, answer:boolean}[]=[];

      for(var result of res){
        if(result.answer==="YES")
        temp.push({questionId:result.questionId,answer:true});
        else
        temp.push({questionId:result.questionId,answer:false}); 
      }
      return temp;
    }

    getTokFromlocal(){
      return this.token;
    }


    public executionStatus(){
      this.setDetails();
      return this.http.post(this.severityUrl,this.requestData1,this.headers);
    }

}
