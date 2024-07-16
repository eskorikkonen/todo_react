import { Task } from './types';

// Based on https://dev.to/esponges/indexeddb-your-offline-and-serverless-db-in-your-browser-with-react-3hm7

let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

const dbName = 'tasksDB'
const storeName = 'tasks';

const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    request = indexedDB.open(dbName);

    request.onupgradeneeded = (event) => {
      db = (event.target as any).result;

      if (!db.objectStoreNames.contains(storeName)) {
        console.log('Creating tasks store');
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      db = (event.target as any).result
      version = db.version;
      console.log('request.onsuccess - initDB', version);
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
}

const addTask = (data: Task): Promise<Task | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open(dbName, version);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
};

const listTasks = (): Promise<Task[]> => {
  return new Promise((resolve) => {
    let request = indexedDB.open(dbName);

    request.onsuccess = () => {
      console.log('request.onsuccess - getAllData');
      db = request.result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

const deleteTask = (key: string): Promise<boolean> => {
  return new Promise((resolve) => {
    request = indexedDB.open(dbName, version);

    request.onsuccess = () => {
      console.log('request.onsuccess - deleteData', key);
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const res = store.delete(key);

      res.onsuccess = () => {
        resolve(true);
      };
      res.onerror = () => {
        resolve(false);
      }
    };
  });
};

export { initDB, listTasks, addTask, deleteTask }; 