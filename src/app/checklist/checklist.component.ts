import { GetQuestionsList } from './../Services/getQuestionList.service';
import { Severity } from './../Services/severity.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Security } from '../Services/security.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuesURL } from '../Models/tokens';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})

export class ChecklistComponent implements OnInit {

  constructor(private qList:GetQuestionsList,
    private sev:Severity , private severityapi:Severity,
    private route:Router,
    private security:Security,
    private http:HttpClient,
    @Inject(QuesURL) private queSerUrl:string
    ) { }

    public message:string="";
    private token=localStorage.getItem('auditToken');
    headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${this.token}`
      })
    }
  
  static getAuditTypeVal(): string {
    throw new Error('Method not implemented.');
  }

  public auditType:string="";
  public projectName:string="";
  showQues:boolean=false;
  public quesList:any[]=[];
  public loadFlag=false;
  public response:{questionId:number, answer:string}[]=[];

  ngOnInit(): void {
    if(!this.security.checkLogin())
    this.route.navigate(['unauthorisedError']);

    this.loadFlag=false;
    this.response=this.qList.sendResponse();
  }

  getQuestions(){
    console.log(this.auditType);
    console.log(this.projectName);

    if(this.auditType.length>0 && this.projectName.length>0){
      this.getList(this.getAuditTypeVal());
    }

    else
    alert("Please Enter details correctly");

  }
  
   getList(auditVal:number){
     this.loadFlag=true;
     let temp:any;
    this.http.get(this.queSerUrl+"/"+auditVal,this.headers).subscribe(response=>{
      console.log(response);
      temp=response;
    },
    error=>{
      if(error.status=="401"){
        this.route.navigate(['server-error']);
      }
      else{
        alert("uncexpected error occured");
        this.route.navigate(['serverError']);
      }
    },
    ()=>{
      this.quesList=temp;
    });
  }

  responseYes(i:number){
    this.response[i].questionId=this.quesList[i].questionId;
    this.response[i].answer="YES";
    console.log(typeof this.response)
  }

  responseNo(i:number){
    this.response[i].questionId=this.quesList[i].questionId;
    this.response[i].answer="NO";
  }

  getResponse(){
    if(this.qList.validateResponse(this.response)){
    this.qList.getResponse(this.response);
    this.qList.setDetails(this.projectName,this.getAuditTypeVal());
    this.route.navigate(['dashboard']);
    }
    else{
      this.message="Please Answer all the questions!";
    }
  }


  getAuditTypeVal(){
    if(this.auditType==="Internal")
      return 0;
    else
      return 1;
  }

}
