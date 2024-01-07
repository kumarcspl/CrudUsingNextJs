import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

admin.initializeApp();

const db = admin.firestore();
const app = express();


app.use(cors({ origin: true }));


app.get('/users', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users: any[] = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.set('Access-Control-Allow-Origin', '*'); 
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send('Error fetching users');
  }
});


app.post('/users', async (req, res) => {
  try {
    const { fname, lname,addr,email,phno } = req.body;
    const newUser = await db.collection('users').add({ fname,lname,addr, email,phno });
    res.set('Access-Control-Allow-Origin', '*'); 
    return res.status(201).json({ message: 'User added', id: newUser.id });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add user', err:error  });
  }
});


app.put('/users/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const { fname, lname,addr,email,phno } = req.body;
  
      const userRef = db.collection('users').doc(userId);
      await userRef.update({ fname, lname,addr,email,phno });
      
      res.set('Access-Control-Allow-Origin', '*'); 
      return res.status(200).json({ message: 'User updated', id: userId });
    } catch (error) {
      return res.status(500).send('Failed to update user');
    }
  });
  

  app.delete('/users/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const userRef = db.collection('users').doc(userId);
      await userRef.delete();
      
      res.set('Access-Control-Allow-Origin', '*'); 
      return res.status(200).json({ message: 'User deleted', id: userId });
    } catch (error) {
      return res.status(500).send('Failed to delete user');
    }
  });
  

export const api = functions.https.onRequest(app);
