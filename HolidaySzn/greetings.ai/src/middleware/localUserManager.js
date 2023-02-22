import axios from "axios";
const getUserProfile = () => {

    return new Promise((resolve, reject) => {
    const serverURL = process.env.REACT_APP_SERVER_URL; 
    const url = serverURL.concat("/auth/user/profile");
    
    axios.get(url, { withCredentials: true }).then(
        (data) => {
        console.log(data.data);
        
        //console.log(userProfile)
        
        const userProfileComponent = Object.values(data.data);
        //console.log('userProfile', userProfileComponent);
        resolve(userProfileComponent[0])
        
        }
    ).catch( (err) => reject(err))
})
    }


    const getUserProfileName = () => {

        return new Promise((resolve, reject) => {
        const serverURL = process.env.REACT_APP_SERVER_URL; 
        const url = serverURL.concat("/auth/user/profile");
        
        axios.get(url, { withCredentials: true }).then(
            (data) => {
            console.log(data.data);
            
            //console.log(userProfile)
            
            const userProfileComponent = Object.values(data.data);
            //console.log('userProfile', userProfileComponent);
            resolve(userProfileComponent[1])
            
            }
        ).catch( (err) => reject(err))
    })
        }

export  {getUserProfile, getUserProfileName}