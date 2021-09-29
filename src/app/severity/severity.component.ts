import { Component, OnInit } from '@angular/core';
import { Severity } from '../Services/severity.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuditResponse } from '../Models/auditResponse.model';
import { Router } from '@angular/router';
import { Security } from '../Services/security.service';
import { GetQuestionsList } from '../Services/getQuestionList.service';

@Component({
  selector: 'app-severity',
  templateUrl: './severity.component.html',
  styleUrls: ['./severity.component.css']
})
export class SeverityComponent implements OnInit {
  
  public finalRes:any;
  public resStatus:string="";
  
  constructor(private sev:Severity,
    private router:Router,
    private security:Security,
    private qList:GetQuestionsList) { }
     auditResponse=new AuditResponse(0,"","","","");

  ngOnInit(): void {
    if(!this.security.checkLogin())
    this.router.navigate(['unauthorisedError']);
    this.getexecutionStatus();
  }

  getexecutionStatus(){
    var temp:any;
    this.sev.executionStatus()  //returns an observable
    .subscribe(response=>{
      console.log(response);
      temp=response;
    },error=>{
      console.log(error.message);
    },
    ()=>
    {
      this.finalRes=temp;
      this.setResults(this.finalRes);
    });
  }

  setResults(finalRes:any){
    this.auditResponse.auditId=Math.abs(finalRes.auditId);
    if(finalRes.auditExecutionStatus==0)
    this.auditResponse.projectStatus="Green";
    else
    this.auditResponse.projectStatus="Red";
    this.auditResponse.remedyAction=finalRes.remedialActionDuration;
    this.auditResponse.projectName=this.qList.getProjectName();
    this.auditResponse.managerName=this.security.getUserName();

    this.resStatus=finalRes.remedialActionDuration;
  }

}
