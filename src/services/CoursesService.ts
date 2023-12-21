import { ICourses } from "../domain/ICourses";
import { IJWTResponse } from "../dto/IJWTResponse";
import { BaseEntityService } from "./BaseEntityService";

export class CoursesService extends BaseEntityService<ICourses> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)){
        super('v1/Courses', setJwtResponse);
    }

    async add(jwtData: IJWTResponse, newCourse: ICourses): Promise<boolean> {
        try {
            const response = await this.axios.post("https://localhost:7189/api/v1/Courses", newCourse, {
                headers: {
                    'Authorization': 'Bearer ' + jwtData.jwt 
                }
            });

            if (response.status === 201) {
                console.log('Course added successfully:', response.data);
                return true;
            }

            console.log('Failed to add course:', response);
            return false;
        } catch (e) {
            console.error('Error adding course:', (e as Error).message, e);
            return false;
        }
    }
    
}