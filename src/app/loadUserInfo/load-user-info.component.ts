import { Component, Input, DoCheck, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { Offer } from '../shared/offer';
import { Skill } from '../shared/skill';
import { OfferService } from '../offer/offer.service';
import { UserService } from '../user-service/user.service';
import { AuthenticationService } from '../authorise/authentication.service';
import { AlertService } from '../alert-service/alert.service';
import { SkillService } from '../skill-service/skill.service';
import { Router } from '@angular/router';

@Component({
    selector: "load",
    templateUrl: 'load-user-info.component.html',
    styleUrls: ['load-user-info.component.css']
})
export class LoadUserComponent implements OnInit {
    @Input() user: User;
    offers: Offer[];
    addedSkill: string;
    allSkils: Skill[];
    selectedSkill: string;
    delArray: Number[] = [];
    isEditing = false;
    isShow: boolean = false;
    isSkills: boolean = false;
    constructor(private offerService: OfferService,
        private userService: UserService,
        private authService: AuthenticationService,
        private skillService: SkillService,
        private alertService: AlertService,
        private router: Router) { }

    ngOnInit() {
        this.userService.GetUserByLogin(this.authService.loginString).subscribe(data => {
            this.user = data;
            console.log('this.user = ' + this.user)
        });
        this.skillService.getAllSkills().subscribe(res => this.allSkils = res);
    }

    changeSelectedSkill(newSkill: string) {
        this.selectedSkill = newSkill;
    }

    deleteSelectedOffers() {
        this.offerService.deleteSelectedOffers(this.delArray).subscribe(o => {
            this.alertService.success("Selected offers successfully deleted!");
            this.router.navigateByUrl('/home');
        });
    }

    onClick() {
        this.isEditing = !this.isEditing;
    }
    onSkills() {
        this.isSkills = !this.isSkills;
    }
    onShowOffer() {
        this.isShow = !this.isShow;
        this.offers = this.offerService.getUserOffers(this.user.id);
    }

    addSkill() {
        let skill = new Skill();
        skill.name = this.selectedSkill;
        skill.id = this.allSkils.find(exp => exp.name == skill.name).id;
        // let skillArr = new Array<Skill>();
        this.user.skills.push(skill);
        this.userService.updateUserSkills(this.user.skills, this.user.id).subscribe(hell => {
            this.userService.GetUserByLogin(this.authService.loginString).subscribe(data => {
                this.user = data;
                console.log('this.user = ' + this.user)
            });
        });

        this.addedSkill = null;
    }

    deleteSkill() {
        let skill = new Skill();
        skill.name = this.selectedSkill;
        skill.id = this.allSkils.find(exp => exp.name == skill.name).id;
        this.userService.deleteUserSkill(this.user.id, skill.id).subscribe(data => {
            this.userService.GetUserByLogin(this.authService.loginString).subscribe(data => {
                this.user = data;
                console.log('this.user = ' + this.user)
            });
        })
        // this.user.skills.splice(this.user.skills.indexOf(skill), 1);
        // this.userService.updateUserSkills(this.user.skills, this.user.id).subscribe(hell => {
        //     this.userService.GetUserByLogin(this.authService.loginString).subscribe(data => {
        //         this.user = data;
        //         console.log('this.user = ' + this.user)
        //     });
        // });
    }

    checkbox(id: Number) {
        if (this.delArray.find(x => x == id)) {
            this.delArray.splice(this.delArray.indexOf(id), 1)
        }
        else {
            this.delArray.push(id);
        }
        console.log(this.delArray);
    }

    saveChanges() {
        this.userService.UpdateUser(this.user).subscribe(data => {
            // set success message and pass true paramater to persist the message after redirecting to the login page
            this.alertService.success('Changes successfully saved', true);
        },
            error => {
                this.alertService.error(error);
            });
        this.isEditing = false;
    }
}