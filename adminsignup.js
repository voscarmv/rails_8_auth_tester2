import fetch from 'node-fetch';
import readline from 'readline';
import dotenv from 'dotenv';
dotenv.config();

const readLineAsync = () => {
  const rl = readline.createInterface({
    input: process.stdin
  });

  return new Promise((resolve) => {
    rl.prompt();
    rl.on('line', (line) => {
      rl.close();
      resolve(line);
    });
  });
};

(
  async () => {
    const url = `${process.env.APIURL}/session`;
    const usr = process.env.ADMIN;
    const pass = process.env.ADMINPASS;
    let output = null;
    try {
      const response = await fetch(url, {
        method: 'POST', // Use POST or another HTTP method as needed
        headers: {
          'Content-Type': 'application/json', // Set the content type
        },
        body: JSON.stringify({ email_address: usr, password: pass }) // Send the body as JSON
      });
      output = await response.json();
    } catch (e) {
      console.error(e)
    }
    console.log(output);
    const url2 = `${process.env.APIURL}/users`;
    let output2;
    let headers2;
    try {
      const response = await fetch(url2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${output.data.token}`,
        },
        body: JSON.stringify({ user: {email_address: process.env.USER, password: process.env.USERPASS }}) // Send the body as JSON
      });
      output2 = await response.json();
      headers2 = response.headers;
    } catch (e) {
      console.error(e)
    }
    console.log(output2);
    console.log(headers2.get('authorization'));
  }
)();