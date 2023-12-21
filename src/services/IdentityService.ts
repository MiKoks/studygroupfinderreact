import { IJWTResponse } from "../dto/IJWTResponse";
import { ILoginData } from "../dto/ILoginData";
import { IRegisterData } from "../dto/IRegisterData";
import IdentityState from "../state/IdentityState";
import { BaseService } from "./BaseService";

export class IdentityService extends BaseService {
    constructor() {
        super('v1/identity/account/');
    }

    async authenticateUser(token: string): Promise<boolean> {
        try {
            const response = await this.axios.get('auth', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                // User is authenticated
                return true;
            }
            return false;
        } catch (e) {
            console.log('Authentication error: ', (e as Error).message);
            return false;
        }
    }

    async register(data: IRegisterData): Promise<IJWTResponse | undefined> {
        try {
            const response = await this.axios.post<IJWTResponse>('register', data);

            console.log('register response', response);
            if (response.status === 200) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async login(data: ILoginData): Promise<IJWTResponse | undefined> {
        try {
            const response = await this.axios.post<IJWTResponse>('login', data);

            console.log('login response', response);
            if (response.status === 200) {
                localStorage.setItem("authToken", response.data.jwt);
                return response.data;
            }
            
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async logout(data: IJWTResponse): Promise<true | undefined> {
        console.log(data);

        try {
            const response = await this.axios.post(
                'logout', 
                data,
                {
                    headers: {
                        'Authorization': 'Bearer ' + data.jwt
                    }
                }
            );

            console.log('logout response', response);
            if (response.status === 200) {
                localStorage.removeItem("authToken");
                return true;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async refreshToken(data: IJWTResponse): Promise<IJWTResponse | undefined> {
        console.log(data);
        
        try {
            const response = await this.axios.post<IJWTResponse>(
                'refreshtoken', 
                data
            );

            console.log('refresh token response', response);
            if (response.status === 200) {
                localStorage.setItem("authToken", response.data.jwt);
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async refreshTokenOrLogout(data: IJWTResponse): Promise<boolean> {
        try {
            const response = await this.axios.post<IJWTResponse>(
                'refreshtoken',
                data
            );
    
            if (response.status === 200) {
                localStorage.setItem("authToken", response.data.jwt);
                return true;
            }
    
            console.log('Token refresh failed');
            this.logout(data); // Log out the user
            return false;
        } catch (e) {
            console.log('Error while refreshing token: ', (e as Error).message);
            this.logout(data); // Log out the user
            return false;
        }
    }

}
