import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PageManagerService } from './oldDupia/pages/page-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dupia';

  isMainPageVisible!:boolean;
  isLoginPageVisible!:boolean;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener: () => void;

  constructor(private pageManager:PageManagerService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private modalService: NgbModal, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.pageManager.name="main-page";
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnDestroy(): void {
    //localStorage.setItem('isLoggedIn', 'false');
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  ngOnInit() {
    //this.router.navigate(['main'])--old dupia için kapandı
    var name = this.pageManager.name;
    //alert("page name: "+name);
    if(name=="main-page"){
      this.isMainPageVisible=true;
      this.isLoginPageVisible=false;
    }else if(name=="login-page"){
      this.isMainPageVisible=false;
      this.isLoginPageVisible=true;
    }
  }

  ngAfterViewInit(){
    
  }




}
