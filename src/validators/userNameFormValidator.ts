import { FormControl } from '@angular/forms';

export class UserNameFormValidator{
    
    static checkUserName(control: FormControl): any {
        
        return new Promise(resolve =>{
            
           setTimeout(() =>{
               
            if(control.value.toLowerCase()=== ""){
                resolve({
                    "Username taken":true
                });
            } else {
                resolve("sucessful Username");
            }
           }, 2000);
    });
    }
}