import { Component, TemplateRef } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
interface userType {
  image?: string,
  name: string,
  position: string,
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    RouterLink,
    NgbModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  createForm: FormGroup;
  editForm: FormGroup;
  active = 1;
  edit_id: string = '';
  submitted: boolean = false;
  lodingData: boolean = false;
  imageURL: any = 'assets/images/contacts/user.jpg';
  current_active_tab: string = 'allContacs';

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.createForm = fb.group({
      image: [''],
      name: ['', Validators.required],
      occupation: ['', Validators.required]
    });
    this.editForm = fb.group({
      image: [''],
      name: ['', Validators.required],
      occupation: ['', Validators.required]
    });
  }
  get f() {
    return this.createForm.controls;
  }

  openCenter(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  selectNavTab(type: any) {
    this.current_active_tab = type;
  }

  getDetaEdit(id: any) {
    this.edit_id = id;
    let editDeta;
    if (this.current_active_tab == 'allContacs') {
      editDeta = this.userList.filter((val, i) => i === id);
    } else {
      editDeta = this.pendingInvitation.filter((val, i) => i === id);
    }
    this.editForm = this.fb.group({
      // image: [`${editDeta[0].image}`, Validators.required],
      name: [`${editDeta[0].name}`, Validators.required],
      occupation: [`${editDeta[0].position}`, Validators.required]
    });
    if (editDeta[0].image) {
      this.imageURL = editDeta[0].image;
    } else {
      this.imageURL = 'assets/images/contacts/user.jpg';
    }
  }

  image: any;
  onSubmit() {
    this.submitted = true;
    if (this.createForm.valid) {
      if (this.createForm.value.image) {
        this.image = this.imageURL
      } else {
        this.image = null;
      }
      const data = {
        image: this.image,
        name: this.createForm.value.name,
        position: this.createForm.value.occupation
      }
      this.userList.splice(0, 0, data);
      this.modalService.dismissAll();
      this.imageURL = 'assets/images/contacts/user.jpg';
    }
    this.createForm.reset();
  }

  onSubmitEdit(id: any) {
    if (this.editForm.valid) {
      if (this.current_active_tab == 'allContacs') {
        for (let i = 0; i < this.userList.length; i++) {
          if (i == id) {
            this.userList[i].image = this.imageURL;
            this.userList[i].name = this.editForm.value.name;
            this.userList[i].position = this.editForm.value.occupation;
          }
        }
      } else {
        for (let i = 0; i < this.pendingInvitation.length; i++) {
          if (i == id) {
            this.pendingInvitation[i].image = this.imageURL;
            this.pendingInvitation[i].name = this.editForm.value.name;
            this.pendingInvitation[i].position = this.editForm.value.occupation;
          }
        }
      }
      this.imageURL = 'assets/images/contacts/user.jpg';
      this.modalService.dismissAll();
    }
  }


  deleteUser(id: any) {
    if (this.current_active_tab == 'allContacs') {
      this.userList.map((val: any, i: any) => {
        if (id == i) {
          this.userList.splice(id, 1);
        }
      });
    } else {
      this.pendingInvitation.map((val: any, i: any) => {
        if (id == i) {
          this.pendingInvitation.splice(id, 1);
        }
      });
    }
  }

  getImage(ev: any) {
    if (ev.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(ev.target.files[0]);
      reader.onload = (event: any) => {
        this.imageURL = event.target.result;
      }
    }
  }

  loadMoreData() {
    this.lodingData = true;
    setTimeout(() => {
      let x = Math.floor((Math.random() * 5) + 1);
      let data = this.moreDataArra.filter((val, i) => i == x - 1);
      this.lodingData = false;
      if (this.current_active_tab == 'allContacs') {
        this.userList.push(data[0]);
      } else {
        this.pendingInvitation.push(data[0]);
      }
    }, 1000);
  }

  userList: userType[] = [
    {
      image: 'assets/images/contacts/Untitled-3.jpg',
      name: 'Alan Green',
      position: 'UI Designer'
    },
    {
      image: 'assets/images/contacts/Untitled-1.jpg',
      name: 'Angela Moss',
      position: 'Redblue Studios',
    },
    {
      image: 'assets/images/contacts/Untitled-2.jpg',
      name: 'Brian Samuel',
      position: 'Team Management',
    },
    {
      image: 'assets/images/contacts/Untitled-4.jpg',
      name: 'Benny Chagur',
      position: 'Highspeed Inc.',
    },
    {
      image: 'assets/images/contacts/Untitled-5.jpg',
      name: 'Chyntia Lawra',
      position: 'Zero Two Studios',
    },
    {
      image: 'assets/images/contacts/Untitled-6.jpg',
      name: 'Cloe Simatupang',
      position: 'Zero Two Studios'
    },
    {
      image: 'assets/images/contacts/Untitled-7.jpg',
      name: 'Engeline O’conner',
      position: 'Beep Beep Inc.'
    },
    {
      image: 'assets/images/contacts/Untitled-8.jpg',
      name: 'Franklin Jr.',
      position: 'Zero Two Studios'
    },
    {
      image: 'assets/images/contacts/Untitled-9.jpg',
      name: 'Geovanny',
      position: 'UI Designer'
    },
    {
      image: 'assets/images/contacts/Untitled-10.jpg',
      name: 'Henry Charlotte',
      position: 'UI Designer.'
    },
    {
      image: 'assets/images/contacts/Untitled-11.jpg',
      name: 'Ivankov Shee',
      position: 'UI Designer'
    },
    {
      image: 'assets/images/contacts/Untitled-12.jpg',
      name: 'Nindy Leeacovic',
      position: 'Zero Two Studios'
    }
  ]
  pendingInvitation: userType[] = [
    {
      image: 'assets/images/contacts/Untitled-1.jpg',
      name: 'Brian Samuel',
      position: 'Team Management',
    },
    {
      name: 'Benny Chagur',
      position: 'Highspeed Inc.',
    },
    {
      image: 'assets/images/contacts/Untitled-4.jpg',
      name: 'Chyntia Lawra',
      position: 'Zero Two Studio',
    },
    {
      image: 'assets/images/contacts/Untitled-3.jpg',
      name: 'Cloe Simatupang',
      position: 'Zero Two Studios',
    },
    {
      image: 'assets/images/contacts/Untitled-8.jpg',
      name: 'Engeline O’conner',
      position: 'Beep Beep Inc',
    },
    {
      name: 'Franklin Jr.',
      position: 'Zero Two Studios',
    },
  ]
  moreDataArra = [
    {
      image: 'assets/images/contacts/Untitled-11.jpg',
      name: 'Alan Green',
      position: 'UI Designer',
    },
    {
      image: 'assets/images/contacts/Untitled-4.jpg',
      name: 'Brian Samuel',
      position: 'Team Management',
    },
    {
      image: 'assets/images/contacts/Untitled-9.jpg',
      name: 'Cloe Simatupang',
      position: 'Zero Two Studios',
    },
    {
      image: 'assets/images/contacts/Untitled-10.jpg',
      name: 'Engeline O’conner',
      position: 'Beep Beep Inc',
    },
    {
      name: 'Henry Charlotte',
      position: 'UI Designer',
    }
  ]

}
