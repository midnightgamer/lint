import { KeycloakService } from "keycloak-angular";
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