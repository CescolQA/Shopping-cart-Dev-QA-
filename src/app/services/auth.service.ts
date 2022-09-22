import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Cliente } from '../models/cliente.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public cliente: Cliente;
  constructor(
    private afauth: AngularFireAuth,
    public database: AngularFirestore) {
    this.cliente = {
      uid: '',
      email: '',
      nombre: '',
      foto: '',
      referencia: ''
    }
    this.getUid();
  }

  createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc<type>(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }

  getId() {
    return this.database.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }





  //Login, Register, Login con google
  async register(email: string, password: string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error en login", error)
      return null;
    }
  }


  async login(email: string, password: string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error en login", error)
      return null;
    }
  }

  async loginWithGoogle(email: string, password: string) {
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log("error en login con Google", error)
      return null;
    }
  }

  getUserLogged() {
    return this.afauth.authState;
  }

  logOut() {
    this.afauth.signOut();
  }

  async getUid() {
    const user = await this.afauth.currentUser;
    if (user === null) {
      return null;
    } else {
      return user.uid;
    }
  }


  stateAuth() {
    return this.afauth.authState
  }


  getCollectionQuery<tipo>(path: string, parametro: string, condicion: any, busqueda: string) {
    const collection = this.database.collection<tipo>(path,
      ref => ref.where(parametro, condicion, busqueda));
    return collection.valueChanges();
  }


}

