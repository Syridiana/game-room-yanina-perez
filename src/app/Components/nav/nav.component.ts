import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openMenu() {
    let x = Array.from(document.getElementsByClassName('nav-item') as HTMLCollectionOf<HTMLElement>)

    x.forEach( link => {
       if (link && link.style.display === "block") {
        link.style.display = "none";
      } else {
        link!.style.display = "block";
      } 
    } )


  }

  closeMenu(){
    if(window.matchMedia("(max-width: 768px)").matches){
      this.openMenu();
    }

  }

}
