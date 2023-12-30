import Axios, { AxiosInstance } from 'axios';

export abstract class BaseService {
    //protected static hostBaseURL = "https://localhost:7189/api/";
    //protected static hostBaseURL = "http://localhost:8000/api/";
    protected static hostBaseURL = "https://studygroupback.azurewebsites.net/api/";

    protected axios: AxiosInstance;

    constructor(baseUrl: string) {

        this.axios = Axios.create(
            {
                baseURL: BaseService.hostBaseURL + baseUrl,
                headers: {
                common: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        )

        this.axios.interceptors.request.use(request => {
            //console.log('Starting Request', JSON.stringify(request, null, 2))
            sessionStorage.getItem("jwtToken");
            return request;
        })
    }


}

