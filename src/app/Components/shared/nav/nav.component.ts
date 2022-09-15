import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import UserInterface from 'src/app/Entities/user-interface';
import { UserFirestoreService } from 'src/app/Services/user-firestore-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public currentUserEmail: any;
  public currentUser!: any | null;
  public userName: string | any;
  usersArray: UserInterface[] | undefined;

  constructor(private angularFireAuth: AngularFireAuth, private routes: Router, private userFirestoreService: UserFirestoreService) {

    this.angularFireAuth.onAuthStateChanged((user) => {
      if(user){
        this.currentUserEmail = user.email;
      }
      this.userFirestoreService.getUsers().subscribe(users => {
        this.usersArray = users;
        this.userName = (this.usersArray?.find(u => u.email === this.currentUserEmail))?.userName;
      })
    })
/* 
    this.userFirestoreService.getUsers().subscribe(users => {
      this.usersArray = users;
    }) */
   }

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

  SignOut() {
    this.angularFireAuth
      .signOut();
    this.currentUserEmail = "";
    this.userName = "";

    Swal.fire({
      title: 'Adios!',
      text: "Usuario deslogueado",
      icon: 'warning',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      background: "#f76ac8",
      iconColor: "#000",
      color: "#000"
    });
    
    this.routes.navigate(['/']);
    

  }

}
