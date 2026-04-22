import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { CanLeave } from "../../shared/models/user.model";

@Injectable({
    providedIn:'root'
})

export class LeaveGuard implements CanDeactivate<CanLeave>{
    canDeactivate(component: CanLeave): boolean {
        return component.canLeave?component.canLeave():true;
    }
}