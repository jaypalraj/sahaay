import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './security/security.component';

import { UserSettingsComponent } from './user-settings.component';

const routes: Routes = [{ path: '', component: UserSettingsComponent, 
                          children:[
                                    { path: 'profile', component: ProfileComponent},
                                    { path: 'privacy', component: PrivacyComponent},
                                    { path: 'security', component: SecurityComponent},
                                    { path: '', redirectTo: 'profile', pathMatch: 'full'}
                                  ]
                        }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSettingsRoutingModule { }
