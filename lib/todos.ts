import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt?: Timestamp;
}

export async function createTask(text: string): Promise<string> {
  if (!db) {
    throw new Error('Firebase no está inicializado. Verifica las variables de entorno.');
  }
  const docRef = await addDoc(collection(db, 'todos'), {
    text,
    completed: false,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getTasks(): Promise<Task[]> {
  if (!db) {
    throw new Error('Firebase no está inicializado. Verifica las variables de entorno.');
  }
  const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Task[];
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<void> {
  if (!db) {
    throw new Error('Firebase no está inicializado. Verifica las variables de entorno.');
  }
  const taskRef = doc(db, 'todos', id);
  await updateDoc(taskRef, updates);
}

export async function deleteTask(id: string): Promise<void> {
  if (!db) {
    throw new Error('Firebase no está inicializado. Verifica las variables de entorno.');
  }
  const taskRef = doc(db, 'todos', id);
  await deleteDoc(taskRef);
}

