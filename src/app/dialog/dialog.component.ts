import { Component, Inject, OnInit } from '@angular/core';
import { EntryService } from "../entry.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  projectForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, @Inject(MAT_DIALOG_DATA) public data:any, private entryService: EntryService, private dialogRef : MatDialogRef<DialogComponent>) {
  }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name : ['', Validators.required]
      })
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

  addEntry() {
    this.entryService.addToFirestore(this.projectForm.value.name, this.formatDate2(this.data.start), this.formatDate2(this.data.end), this.formatDate(this.data.duration)).then()
    this.dialogRef.close();
  }
}
