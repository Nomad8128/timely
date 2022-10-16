import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EntryService } from "../entry.service";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})
export class DialogEditComponent implements OnInit {
  projectForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, @Inject(MAT_DIALOG_DATA) public data:any, private entryService: EntryService, private dialogRef : MatDialogRef<DialogComponent>) {
  }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name : ['', Validators.required],
      start : ['', Validators.required],
      end : ['', Validators.required],
      duration : ['', Validators.required]
    })
    if (this.data){
      this.projectForm.controls['name'].setValue(this.data.name)
      this.projectForm.controls['start'].setValue(this.data.start)
      this.projectForm.controls['end'].setValue(this.data.end)
      this.projectForm.controls['duration'].setValue(this.data.duration)
    }
  }

  updateEntry() {
    this.entryService.updateEntry(this.data.name, this.projectForm.controls['name'].getRawValue(), this.projectForm.controls['start'].getRawValue(), this.projectForm.controls['end'].getRawValue(), this.projectForm.controls['duration'].getRawValue())
    this.dialogRef.close();
  }
}
