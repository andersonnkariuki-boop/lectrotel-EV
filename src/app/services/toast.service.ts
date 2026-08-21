import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastController = inject(ToastController);

  async show(message: string, color: string = 'primary', duration: number = 3000) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position: 'bottom',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  async showSuccess(message: string) {
    await this.show(message, 'success');
  }

  async showError(message: string) {
    await this.show(message, 'danger');
  }

  async showInfo(message: string) {
    await this.show(message, 'tertiary');
  }

  async showWarning(message: string) {
    await this.show(message, 'warning');
  }
}