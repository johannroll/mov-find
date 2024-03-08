import { Directive, HostListener } from "@angular/core";


@Directive({
    standalone: true,
    selector: '[stopPropagation]',
})

export class stopPropagation {
    @HostListener('click', ['$event'])
    
    public onClick(event: any): void {
        event.stopPropagation();
    }
}