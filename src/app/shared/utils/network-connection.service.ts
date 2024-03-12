import { Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BehaviorSubject, Subject, map, switchMap, tap } from 'rxjs';

export interface NetworkStatusState {
    online: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class NetworkConnectionService {
    
state = signal<NetworkStatusState>({
    online: true
})


isOnline = computed(() => this.state().online);

private networkStatus = new BehaviorSubject<boolean>(navigator.onLine);
checkConnection$ = this.networkStatus.pipe(
map((status) => status))

constructor() {
window.addEventListener('online', this.updateNetworkStatus.bind(this));
window.addEventListener('offline', this.updateNetworkStatus.bind(this));

}

private updateNetworkStatus() {
this.networkStatus.next(navigator.onLine);
}


}

  