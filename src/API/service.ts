import axios from 'axios';

export const service = {
    async Auth(login: string | number, password: string | number) {
      try {
          const response = await axios.get(' http://localhost:3004/users', {});
          if (response.data[0].login === login && response.data[0].password === password) {
            localStorage.setItem('auth', 'true')
            return true;
          } else {
            return false;
          }
      } catch (e) {
          console.log('Error:', e);
      };
    }
};