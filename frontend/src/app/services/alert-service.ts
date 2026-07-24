import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export const msgType = {
  ERROR: "error",
  SUCCESS: 'success',
  WARN: 'warn',
};

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private msgService: MessageService,
  ){}



showToast( type:string, message:string , title:string ){
  this.msgService.add({
    severity: type,
    summary: title,
    detail: message
  })
}

}
