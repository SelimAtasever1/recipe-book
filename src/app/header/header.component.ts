import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private userSub : Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService : DataStorageService, private authService : AuthService){}
  
  ngOnInit(): void {
    
    this.userSub =  this.authService.user.subscribe(user => {
    this.isAuthenticated = !!user;
    console.log(!user);
    console.log(!!user);
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  onSaveDatas(){
    this.dataStorageService.StoreRecepies();
  }

  onFetchData(){
    this.dataStorageService.FetchRecepies().subscribe();
  }
}
