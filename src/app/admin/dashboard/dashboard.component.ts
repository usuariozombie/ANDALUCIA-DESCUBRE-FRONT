import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { TownService } from 'src/app/core/town.service';
import { UserService } from 'src/app/core/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public users: any[] = [];
    public errorMessage: string = '';

    constructor(private userService: UserService, private modalService: NgbModal) { }

    ngOnInit() {
        this.loadUsers();
    }

    async loadUsers() {
        try {
            this.users = await this.userService.getUsers();
            console.log(this.users);
        } catch (error) {
            this.errorMessage = 'Ocurrió un error al cargar los usuarios. Por favor, inténtalo de nuevo más tarde.';
        }
    }

    public getDate(timestamp: number): string {
        const dateInMilliseconds = timestamp * 1000;
        return new Date(dateInMilliseconds).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    public openConfirmationModal(user: any): void {
        console.log("Abriendo modal de confirmación para el usuario:", user);
        // Render modal ConfirmationDialogComponent
        const modal = this.modalService.open(ConfirmationDialogComponent, { centered: true, size: 'lg' });
        (modal.componentInstance as ConfirmationDialogComponent).message = '¿Estás seguro de que deseas verificar al usuario con el email ' + user.email + '?';
        modal.result.then((result) => {
            if (result && result === 'Confirm') {
                this.verifyUser(user);
            }
        });
    }

    public verifyUser(user: any): void {
        if (user) {
            user.verified = true;
            this.userService.updateUser(user)
                .then((data) => {
                    if (data.status !== 200) {
                        console.error('Error verifying user', data);
                        user.verified = false;
                        this.errorMessage = 'Ocurrió un error al verificar el usuario. Por favor, inténtalo de nuevo más tarde.';
                    } else {
                        console.log('User verified');
                    }
                })
                .catch(error => {
                    this.errorMessage = 'Ocurrió un error al verificar el usuario. Por favor, inténtalo de nuevo más tarde.';
                    user.verified = false;
                });
        }
    }
}
