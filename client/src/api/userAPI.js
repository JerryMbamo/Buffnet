import API from "../api/baseAPI";

const userAPI = {
  signup: async (user) => {
    try {
      let formData = new FormData(); 
      for(let key in user){
        if(key!=='genres')
          formData.append(key, user[key]); 
        else if(key==='genres')
          formData.append(key, user[key].join()); 
      }
      const res = await API.post("/api/user/signup", formData);
      return res.data.token;  
    } catch (error) {
      return null; 
    }
  },
  checkEmailUsername: async(email, username) => {
    try {
      const res = await API.get(`/api/user/checkUsernameEmail/${username}/${email}`);
      const {success, emailExists, usernameExists, intersectExists} = res.data; 
      if(success && !emailExists && !usernameExists && !intersectExists)
        return true; 
      else if(success)
        return false 
      throw Error('search failed'); 
    } catch (error) {
      return null;
    }
  },
  login: async(emailOrUsername, password) => {
    try {
      const res = await API.get(`/api/user/login/${emailOrUsername}/${password}`); 
      const {success, token} = res.data;
      if(success)
        return token; 
      return null; 
    } catch (error) {
      return null; 
    }
  },
  googleUser: async () =>{
    try {
      const res = await API.get(`/auth/user`, {
        withCredentials: true
      });
      const { success, token } = res.data;
      if (success){
        return token;
      }
      return null;
  } catch (error) {
      return null;
    }

  },

  retrieveUser: async() => { 
    try {
      const bearerToken = localStorage.getItem('token'); 
      const res = await API.get('/api/user/getUser',{
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const {user, success} = res.data; 
      if(success) 
        return user 
      return null;  
    } catch (error) {
      return null; 
    }  
  },
 
  getRecommendations: async() => {
    try {
      const bearerToken = localStorage.getItem('token');
      const res = await API.get('/api/user/getRecommendations',{
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }); 
      const {movies, success} = res.data; 
      if(success)
        return movies; 
      return null; 
      
    } catch (error) {
      return null; 
    }
  }, 

  recordMovieInterest: async(movieID) => {
    try {
      const bearerToken = localStorage.getItem('token');
      const res = await API.get(`/api/user/recordMovie/${movieID}`,{
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const {success} = res.data; 
      if(success){
        return true; 
      }
        
      return false;  
    } catch (error) {
      console.log(error); 
      return false; 
    }
  }
}
export default userAPI; 


