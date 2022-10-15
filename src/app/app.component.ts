import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Entry} from "./entry-model";
import {EntryService} from "./entry.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {DialogEditComponent} from "./dialog-edit/dialog-edit.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'timely-final';
  displayedColumns = ['name', 'start', 'end', 'duration', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  Entry: Entry[] = [];

  d: Date  = new Date();
  f: Date = new Date();
  g: Date = new Date();
  currentDate : String = ''
  isCollapsed: boolean = true;

  constructor(private entryService: EntryService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>(this.Entry);
  }

  ngOnInit(){
    return this.entryService.getAllEntries().subscribe(res => this.dataSource.data=res)
  }

  ngAfterViewInit() {
    if (this.paginator)
      this.dataSource.paginator=this.paginator;
  }

  deleteByDocumentName(name: string){
    this.entryService.deleteByDocumentID(name);
  }

  editEntry(entry: any){
    this.dialog.open(DialogEditComponent, {
      width: '30%',
      data: entry
    });
  }

  toggleCollapse() {
    if (this.isCollapsed){
      this.d = new Date();
      this.currentDate = this.formatDate2(this.d)
    }else {
      this.f = new Date();
      this.g = new Date(this.f.getTime() - this.d.getTime());

      this.dialog.open(DialogComponent, {
        width: '30%',
        data:{
          start: this.d,
          end: this.f,
          duration:this.g
        }
        });
    }
    this.isCollapsed = !this.isCollapsed;
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    return (
      [
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  formatDate2(date: Date) {
    return (
      [
        this.padTo2Digits(date.getDate()),
        this.padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('.') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
      ].join(':')
    );
  }
}

