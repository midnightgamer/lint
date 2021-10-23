import { KeycloakEventType, KeycloakService } from "keycloak-angular";
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';

var keycloak_subject = new Subject<any>();

export function set_keycloak(): void {
    keycloak_subject.next();
}

export function get_keycloak(): Observable<any> {
    return keycloak_subject.asObservable();
}



export function initializeKeycloak(keycloak: KeycloakService) {
    return () => {
        keycloak.keycloakEvents$.subscribe({
            next: e => {
                if (e.type == KeycloakEventType.OnTokenExpired) {
                    let lstoken = localStorage.getItem('iudx-ui-cat-auth-token');
                    if (lstoken) {
                        keycloak.getToken().then((token) => {
                            localStorage.setItem('iudx-ui-cat-auth-token', "Bearer " + token);
                            //console.log(localStorage.getItem('iudx-ui-cat-auth-token'));
                        }, (err) => {
                            console.error("Token Refreshed by Get Token function failed: ", err);
                        });
                    }
                }
            }
        });
        keycloak.init({
            config: environment.keycloak,
            initOptions: {
                checkLoginIframe:true,
                checkLoginIframeInterval:25
            },
            loadUserProfileAtStartUp: true
        }).then(async()=>{
            set_keycloak();
        });
    }
}