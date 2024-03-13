import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface NetworkStatusState {
    online: boolean;
    connectionCount: number;
}

@Injectable({
  providedIn: 'root'
})

export class NetworkConnectionService {
    
state = signal<NetworkStatusState>({
    online: true,
    connectionCount: 0
})


isOnline = computed(() => this.state().online);
connectionCount = computed(() => this.state().connectionCount)

private networkStatus = new BehaviorSubject<boolean>(navigator.onLine);
checkConnection$ = this.networkStatus.pipe(
map((status) => status))

constructor() {
    window.addEventListener('online', this.updateNetworkStatus.bind(this));
    window.addEventListener('offline', this.updateNetworkStatus.bind(this));

}

    private updateNetworkStatus() {
        this.networkStatus.next(navigator.onLine)
    }



}

  